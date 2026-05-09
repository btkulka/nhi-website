import { Mail } from 'lucide-react';
import { siSpotify, siSoundcloud, siInstagram, siTiktok } from 'simple-icons';

// Brand marks — render the simple-icons path inside a small SVG shell.
// fill="currentColor" preserves the design system rule: "always bone,
// never brand-colored." Rest gets stripped by tree-shaking at build time.
function BrandIcon({ icon }) {
  return (
    <svg className="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={icon.path} />
    </svg>
  );
}

const BRAND = {
  spotify:    siSpotify,
  soundcloud: siSoundcloud,
  instagram:  siInstagram,
  tiktok:     siTiktok,
};

export default function PlatformIcon({ platform }) {
  const brand = BRAND[platform];
  if (brand) return <BrandIcon icon={brand} />;
  if (platform === 'email') {
    return <Mail className="icon" strokeWidth={1.5} aria-hidden="true" />;
  }
  return null;
}
