import { useEffect, useRef } from 'react';
import PlatformIcon from './PlatformIcon.jsx';
import { NOW_PLAYING } from '../content.js';

// Boomerang video. Source mp4 is forward + reverse concatenated, playing on loop.
// We modulate playbackRate so the speed eases out into each turn (file start,
// midpoint, file end → wraps to start) and eases back in.
const MIN_RATE = 0.15;
const EASE_WINDOW = 1.5; // seconds — ease zone on each side of every boundary

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export default function VideoStrip() {
  const videoRef = useRef(null);
  const rafRef = useRef(0);

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
  }, []);

  return (
    <a
      className="video-strip"
      href={NOW_PLAYING.trackUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="open i need a forest fire on soundcloud"
      data-spark
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/the-gamut.jpg"
      >
        <source src="/video/burning-tree-1080p-boomerang.mp4" type="video/mp4" media="(min-width: 481px)" />
        <source src="/video/burning-tree-720p-boomerang.mp4"  type="video/mp4" />
      </video>

      <span className="video-sc-mark" aria-hidden="true">
        <PlatformIcon platform="soundcloud" />
      </span>

      <div className="video-labels">
        <span className="video-label video-label--new">new</span>
        <span className="video-label video-label--title">i need a forest fire [nhi flip]</span>
      </div>
    </a>
  );
}
