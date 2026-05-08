import { useEffect, useMemo, useRef, useState } from 'react';
import PlatformIcon from './PlatformIcon.jsx';

const fmt = (t) => {
  if (!isFinite(t)) return '0:00';
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
};

const BAR_COUNT = 56;

// deterministic seed → stable bar shape baseline
const buildBaseline = (count) => {
  const out = [];
  let seed = 7;
  for (let i = 0; i < count; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    const r = seed / 233280;
    out.push(0.30 + r * 0.55); // 0.30–0.85
  }
  return out;
};

export default function AudioBar({ track }) {
  const audioRef = useRef(null);
  const ctxRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const dataRef = useRef(null);
  const rafRef = useRef(0);
  const barRefs = useRef([]);
  const hifiReadyRef = useRef(false);

  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [seekHover, setSeekHover] = useState(null);
  const [hifi, setHifi] = useState(false); // true after WAV swap-in

  const baseline = useMemo(() => buildBaseline(BAR_COUNT), []);

  // ── analyser lifecycle (lazy init on first user-initiated play) ──
  const ensureAnalyser = () => {
    if (analyserRef.current) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      const source = ctx.createMediaElementSource(audioRef.current);
      const analyser = ctx.createAnalyser();
      // 512 → 256 bins (~86 Hz/bin at 44.1k SR). Higher resolution lets us
      // crop to the audible/musical range and ignore the silent top end.
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.82;
      analyser.minDecibels = -85;
      analyser.maxDecibels = -20;
      source.connect(analyser);
      analyser.connect(ctx.destination);
      ctxRef.current = ctx;
      sourceRef.current = source;
      analyserRef.current = analyser;
      dataRef.current = new Uint8Array(analyser.frequencyBinCount);
    } catch (e) {
      // CORS or AudioContext failure — leave analyser unset, decorative pulse remains
    }
  };

  // ── render loop. Writes height directly to DOM to avoid React reflow ──
  useEffect(() => {
    let last = 0;
    const tick = (t) => {
      rafRef.current = requestAnimationFrame(tick);
      if (t - last < 33) return; // ~30fps cap
      last = t;

      const analyser = analyserRef.current;
      const data = dataRef.current;
      const bars = barRefs.current;
      if (!bars.length) return;

      if (analyser && playing) {
        analyser.getByteFrequencyData(data);
        // Map FFT bins to bars using a log-frequency scale and crop the silent
        // upper range. With fftSize=512 at 44.1k SR: 256 bins, ~86 Hz/bin.
        // Music energy concentrates in 20 Hz–8 kHz (~bins 0..93). Above that
        // most material is near-silent on a 192k MP3, so we ignore it.
        const sr = ctxRef.current?.sampleRate || 44100;
        const nyq = sr / 2;
        const minHz = 30;
        const maxHz = 9000; // crop above ~9kHz (silent region for this track)
        const minLog = Math.log2(minHz);
        const maxLog = Math.log2(maxHz);

        for (let i = 0; i < BAR_COUNT; i++) {
          // log-spaced frequency for this bar
          const t = i / (BAR_COUNT - 1);
          const hz = Math.pow(2, minLog + (maxLog - minLog) * t);
          // average a small window of bins around this frequency for smoothness
          const centerBin = (hz / nyq) * data.length;
          const lo = Math.max(0, Math.floor(centerBin - 0.5));
          const hi = Math.min(data.length - 1, Math.ceil(centerBin + 0.5));
          let sum = 0, n = 0;
          for (let b = lo; b <= hi; b++) { sum += data[b]; n++; }
          const v = (sum / n) / 255; // 0..1
          // gentle gain so quieter bins stay visible without over-spiking
          const gained = Math.pow(v, 0.85);
          const h = Math.max(baseline[i] * 0.12, gained) * 100;
          if (bars[i]) bars[i].style.height = `${h}%`;
        }
      } else {
        // ambient slow breath when paused or no analyser yet
        const phase = t / 1400;
        for (let i = 0; i < BAR_COUNT; i++) {
          const wob = 0.5 + 0.5 * Math.sin(phase + i * 0.18);
          const h = baseline[i] * (0.55 + wob * 0.45) * 60;
          if (bars[i]) bars[i].style.height = `${h}%`;
        }
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, baseline]);

  // ── background-load the hi-fi WAV on fast networks, swap at a clean boundary ──
  useEffect(() => {
    if (!track.hifiSrc) return;

    // Skip on slow or data-saver connections
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn) {
      if (conn.saveData) return;
      const slow = ['slow-2g', '2g', '3g'];
      if (slow.includes(conn.effectiveType)) return;
    }

    let preloader = null;
    let started = false;

    const startPreload = () => {
      if (started) return;
      started = true;
      preloader = new Audio();
      preloader.preload = 'auto';
      preloader.src = track.hifiSrc;
      preloader.addEventListener('canplaythrough', () => {
        hifiReadyRef.current = true;
      }, { once: true });
      preloader.addEventListener('error', () => {
        // give up silently — MP3 stays
        hifiReadyRef.current = false;
      }, { once: true });
    };

    // wait until the MP3 has buffered, then wait an extra ~3s of idle
    const el = audioRef.current;
    if (!el) return;

    const onMp3Ready = () => {
      setTimeout(startPreload, 3000);
    };

    if (el.readyState >= 4) {
      onMp3Ready();
    } else {
      el.addEventListener('canplaythrough', onMp3Ready, { once: true });
    }

    return () => {
      el.removeEventListener('canplaythrough', onMp3Ready);
      if (preloader) {
        preloader.src = '';
        preloader = null;
      }
    };
  }, [track.hifiSrc]);

  // ── swap MP3 → WAV at a clean boundary, preserving currentTime ──
  const trySwap = () => {
    if (!hifiReadyRef.current || hifi) return false;
    const el = audioRef.current;
    if (!el) return false;
    const t = el.currentTime;
    const wasPlaying = !el.paused;
    el.src = track.hifiSrc;
    // wait for new src to be seekable, then restore position + state
    const restore = () => {
      try { el.currentTime = t; } catch {}
      if (wasPlaying) el.play().catch(() => {});
      setHifi(true);
    };
    el.addEventListener('loadedmetadata', restore, { once: true });
    return true;
  };

  // ── audio element listeners ──
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const onPlay  = () => setPlaying(true);
    const onPause = () => { setPlaying(false); trySwap(); };
    const onTime  = () => setPosition(el.currentTime || 0);
    const onMeta  = () => setDuration(el.duration || 0);
    const onEnd   = () => {
      // perfect swap moment: track just ended, position resets cleanly
      el.currentTime = 0;
      if (!trySwap()) {
        // no upgrade ready — just loop
      }
    };

    el.addEventListener('play', onPlay);
    el.addEventListener('pause', onPause);
    el.addEventListener('timeupdate', onTime);
    el.addEventListener('loadedmetadata', onMeta);
    el.addEventListener('ended', onEnd);
    return () => {
      el.removeEventListener('play', onPlay);
      el.removeEventListener('pause', onPause);
      el.removeEventListener('timeupdate', onTime);
      el.removeEventListener('loadedmetadata', onMeta);
      el.removeEventListener('ended', onEnd);
    };
  }, []);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      ensureAnalyser();
      if (ctxRef.current?.state === 'suspended') ctxRef.current.resume();
      el.play();
    } else {
      el.pause();
    }
  };

  const onSeek = (e) => {
    const el = audioRef.current;
    if (!el || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    el.currentTime = Math.max(0, Math.min(duration, duration * pct));
  };

  const onSeekMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    setSeekHover(Math.max(0, Math.min(1, pct)));
  };

  const playedTo = duration ? (position / duration) * BAR_COUNT : 0;

  return (
    <div
      className={`audio-bar ${playing ? 'is-playing' : ''} ${hovered ? 'is-hovered' : ''}`}
      role="region"
      aria-label="now playing"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setSeekHover(null); }}
    >
      <div className="audio-bar-art" style={{ backgroundImage: `url(${track.art})` }} aria-hidden="true" />
      <div className="audio-bar-veil" aria-hidden="true" />

      <div className="audio-bar-inner">
        <div className="art-window" style={{ backgroundImage: `url(${track.art})` }}>
          <button
            className="play-btn"
            type="button"
            onClick={toggle}
            aria-label={playing ? 'pause' : 'play'}
            data-spark
          >
            <span className="play-btn-glow" aria-hidden="true" />
            {playing ? (
              <svg viewBox="0 0 9 11" aria-hidden="true">
                <rect x="0" y="0" width="3" height="11" fill="currentColor" />
                <rect x="6" y="0" width="3" height="11" fill="currentColor" />
              </svg>
            ) : (
              <svg viewBox="0 0 11 11" aria-hidden="true">
                <path d="M1 0 L10 5.5 L1 11 Z" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>

        <div className="meta-panel">
          <div className="meta-title">{track.title}</div>
          <div className="meta-flip"><span className="red">{track.flipTag}</span></div>
          {track.attribution && (
            <div className="meta-attribution">
              {track.attribution}
              {hifi && <span className="hifi-tag" aria-label="hi-fi master"> · hi-fi</span>}
            </div>
          )}

          <div
            className="waveform"
            onClick={onSeek}
            onMouseMove={onSeekMove}
            onMouseLeave={() => setSeekHover(null)}
            aria-hidden="true"
          >
            {baseline.map((_, i) => {
              const played = i < playedTo;
              const inHover = seekHover != null && i < seekHover * BAR_COUNT && i >= playedTo;
              return (
                <span
                  key={i}
                  ref={(el) => { barRefs.current[i] = el; }}
                  className={`bar ${played ? 'played' : ''} ${inHover ? 'hovered' : ''}`}
                />
              );
            })}
          </div>

          <div className="audio-footnotes">
            <span className="audio-footnote-time" aria-hidden="true">
              {fmt(position)} <span className="sep">/</span> {fmt(duration)}
            </span>
            {track.trackUrl && (
              <a
                className="audio-footnote-link"
                href={track.trackUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="open on soundcloud"
                data-spark
                onClick={(e) => e.stopPropagation()}
              >
                <PlatformIcon platform="soundcloud" />
              </a>
            )}
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={track.src} preload="metadata" crossOrigin="anonymous" />
    </div>
  );
}
