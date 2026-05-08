import { useEffect, useRef, useState } from 'react';

const fmt = (t) => {
  if (!isFinite(t)) return '0:00';
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
};

export default function AudioBar({ track }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTime = () => setPosition(el.currentTime || 0);
    const onMeta = () => setDuration(el.duration || 0);
    const onEnd = () => { el.currentTime = 0; };

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
    if (el.paused) el.play();
    else el.pause();
  };

  const pct = duration ? (position / duration) * 100 : 0;

  return (
    <div className="audio-bar" role="region" aria-label="now playing">
      <div className="progress" style={{ width: `${pct}%` }} />
      <div className="audio-bar-inner">
        <button
          className={`play-btn ${playing ? 'playing' : ''}`}
          type="button"
          onClick={toggle}
          aria-label={playing ? 'pause' : 'play'}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6 4l14 8-14 8z" />
            </svg>
          )}
        </button>
        <div className="track-info">
          <div className="track-title">{track.title}</div>
          <div className="track-meta">
            <span className="red">{track.flipTag}</span>
            {track.attribution && <> · {track.attribution}</>}
          </div>
        </div>
        <div className="track-time">{fmt(position)} / {fmt(duration)}</div>
      </div>
      <audio ref={audioRef} src={track.src} preload="metadata" />
    </div>
  );
}
