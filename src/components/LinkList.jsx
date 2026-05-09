import PlatformIcon from './PlatformIcon.jsx';

export default function LinkList({ items }) {
  return (
    <nav className="links" aria-label="listen and follow">
      {items.map(({ platform, href, label, handle }) => {
        const isMail = href.startsWith('mailto:');
        const display = label || platform;
        return (
          <a
            key={platform}
            className="link"
            href={href}
            aria-label={display}
            // mailto: should open the user's mail client, not a browser tab
            {...(isMail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
            data-spark
          >
            <PlatformIcon platform={platform} />
            <span className="link-label">{display}</span>
            <span className="link-trail" aria-hidden="true">
              <span className="leader">———</span>
              {handle && <span className="handle">{handle}</span>}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
