import { Download, ExternalLink, Link, Mail } from 'lucide-react';
import {
  siApplemusic,
  siBandcamp,
  siInstagram,
  siSoundcloud,
  siSpotify,
  siTiktok,
  siYoutube,
} from 'simple-icons';

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
  spotify:     siSpotify,
  soundcloud:  siSoundcloud,
  youtube:     siYoutube,
  apple_music: siApplemusic,
  bandcamp:    siBandcamp,
  instagram:   siInstagram,
  tiktok:      siTiktok,
};

// Non-brand marks come from lucide: thin 1.5px outline in the text colour.
const GLYPH = {
  email:      Mail,
  hypeddit:   Download,
  smart_link: Link,
  other:      ExternalLink,
};

// "apple_music" → "apple music" for labels and aria text.
export const platformLabel = (platform) => String(platform ?? '').replace(/_/g, ' ');

export default function PlatformIcon({ platform }) {
  const brand = BRAND[platform];
  if (brand) return <BrandIcon icon={brand} />;
  const Glyph = GLYPH[platform];
  if (Glyph) return <Glyph className="icon" strokeWidth={1.5} aria-hidden="true" />;
  return null;
}
