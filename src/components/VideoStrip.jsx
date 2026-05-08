export default function VideoStrip() {
  return (
    <div className="video-strip">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/the-gamut.jpg"
      >
        <source src="/burning-tree-1080p.mp4" type="video/mp4" media="(min-width: 481px)" />
        <source src="/burning-tree-720p.mp4"  type="video/mp4" />
      </video>
      <div className="video-label">
        <span className="red">new</span> · burning tree
      </div>
    </div>
  );
}
