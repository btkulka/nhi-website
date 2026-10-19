import { useEffect, useRef } from 'react';
import PlatformIcon from './PlatformIcon.jsx';

// Featured media for the first screen. With a canvas video it plays as a
// boomerang: the mp4 is forward + reverse concatenated, looping, and we
// modulate playbackRate so the speed eases out into each turn (file start,
// midpoint, file end → wraps to start) and eases back in. Without a video
// the same frame holds the cover art.
const MIN_RATE = 0.15;
const EASE_WINDOW = 1.5; // seconds — ease zone on each side of every boundary

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export default function VideoStrip({ track }) {
  const videoRef = useRef(null);
  const rafRef = useRef(0);
  const hasVideo = Boolean(track?.video?.src);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
      const dur = v.duration;
      if (!dur || isNaN(dur) || v.paused) return;

      const t = v.currentTime;
      const half = dur / 2;
      const dStart = t;
      const dMid = Math.abs(t - half);
      const dEnd = dur - t;
      const nearest = Math.min(dStart, dMid, dEnd);

      let rate = 1;
      if (nearest < EASE_WINDOW) {
        const k = nearest / EASE_WINDOW;
        rate = MIN_RATE + (1 - MIN_RATE) * easeOutCubic(k);
      }
      if (Math.abs(v.playbackRate - rate) > 0.005) v.playbackRate = rate;
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [hasVideo]);

  if (!track) return null;

  const href = track.trackUrl || null;
  const onSoundcloud = /soundcloud\.com/i.test(href ?? '');
  const label = onSoundcloud ? `open ${track.title} on soundcloud` : `open ${track.title}`;
  const Frame = href ? 'a' : 'div';
  const frameProps = href
    ? { href, target: '_blank', rel: 'noopener noreferrer', 'aria-label': label }
    : { 'aria-label': track.title };

  return (
    <Frame className="video-strip" {...frameProps} data-spark>
      {hasVideo ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={track.video.poster || track.art}
        >
          <source src={track.video.src} type="video/mp4" />
        </video>
      ) : (
        <img className="video-still" src={track.art} alt="" decoding="async" />
      )}

      {href && (
        <span className="video-sc-mark" aria-hidden="true">
          <PlatformIcon platform={onSoundcloud ? 'soundcloud' : 'other'} />
        </span>
      )}

      <div className="video-labels">
        <span className="video-label video-label--new">featured</span>
        <span className="video-label video-label--title">{track.title}</span>
      </div>
    </Frame>
  );
}
