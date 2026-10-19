import PlatformIcon, { platformLabel } from './PlatformIcon.jsx';
import { RELEASE_PLATFORMS, formatDate } from '../content.js';

// Which of a release's links to show, in a stable order. Keys the contract
// does not know about still render (after the known ones) with the generic mark.
const orderedLinks = (links) => {
  if (!links) return [];
  const known = RELEASE_PLATFORMS.filter((k) => links[k]).map((k) => [k, links[k]]);
  const extra = Object.entries(links).filter(([k, v]) => v && !RELEASE_PLATFORMS.includes(k));
  return [...known, ...extra];
};

function Release({ release, newest }) {
  const { slug, title, tag, credit, date, art, links } = release;
  const eyebrow = [tag, formatDate(date)].filter(Boolean).join(' · ');
  return (
    <article className="release" aria-label={title} data-slug={slug}>
      <img
        className="release-art"
        src={art}
        alt=""
        width="72"
        height="72"
        loading="lazy"
        decoding="async"
      />
      <div className="release-body">
        <p className="release-eyebrow">
          {newest && <span className="release-new">new</span>}
          {newest && eyebrow && <span className="sep" aria-hidden="true"> · </span>}
          <span>{eyebrow}</span>
        </p>
        <h3 className="release-title">{title}</h3>
        {credit ? <p className="release-credit">{credit}</p> : null}
        <div className="release-links">
          {orderedLinks(links).map(([platform, href]) => {
            const known = RELEASE_PLATFORMS.includes(platform);
            return (
              <a
                key={platform}
                className="release-link"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} on ${platformLabel(platform)}`}
                data-spark
              >
                <PlatformIcon platform={known ? platform : 'other'} />
              </a>
            );
          })}
        </div>
      </div>
    </article>
  );
}

export default function ReleaseList({ releases = [] }) {
  if (!releases.length) return null;
  return (
    <section className="releases" aria-label="releases">
      <h2 className="section-eyebrow">releases · {releases.length}</h2>
      <div className="release-list">
        {releases.map((r, i) => (
          <Release key={r.slug} release={r} newest={i === 0} />
        ))}
      </div>
    </section>
  );
}
