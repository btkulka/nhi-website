import PlatformIcon from './PlatformIcon.jsx';

export default function LinkList({ items }) {
  return (
    <nav className="links" aria-label="listen and follow">
      {items.map(({ platform, href }) => (
        <a key={platform} className="link" href={href} aria-label={platform}>
          <PlatformIcon platform={platform} />
          <span>{platform}</span>
          <span className="leader">———</span>
        </a>
      ))}
    </nav>
  );
}
