// The featured track's own player, embedded: SoundCloud's widget on the track's
// permalink, or Spotify's on a track id. A play here is a play there, which is the
// point. The dashboard decides which (content.now_playing.embed); this only draws it.
const ACCENT = '%23cd2d44';

export function embedSrc(embed) {
  if (!embed) return null;
  if (embed.provider === 'soundcloud' && embed.url) {
    return `https://w.soundcloud.com/player/?url=${encodeURIComponent(embed.url)}&color=${ACCENT}&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`;
  }
  if (embed.provider === 'spotify' && embed.id) {
    return `https://open.spotify.com/embed/track/${embed.id}?theme=0`;
  }
  return null;
}

export default function EmbedPlayer({ track }) {
  const src = track ? embedSrc(track.embed) : null;
  if (!src) return null;
  const provider = track.embed.provider;
  const height = provider === 'spotify' ? 152 : 220;
  return (
    <section className="embed" aria-label="now playing">
      <iframe
        className="embed-frame"
        title={`${track.title} on ${provider}`}
        src={src}
        width="100%"
        height={height}
        frameBorder="0"
        scrolling="no"
        allow="autoplay; encrypted-media; clipboard-write; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </section>
  );
}
