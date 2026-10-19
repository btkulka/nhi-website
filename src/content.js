// Thin adapter over the generated content file. The dashboard writes
// src/content.json (and an identical public/content.json); nothing in the
// site is hand-authored any more. Components take slices of CONTENT as props.
import CONTENT from './content.json';

export default CONTENT;
export { CONTENT };

// Back-compat names used by the older components.
export const LINKS = CONTENT.links;
export const NOW_PLAYING = CONTENT.now_playing;

// Release links are keyed by platform; this is the order they render in and
// the order used when one has to stand in as "the" link for a release.
export const RELEASE_PLATFORMS = [
  'soundcloud', 'spotify', 'apple_music', 'youtube', 'bandcamp', 'hypeddit', 'smart_link', 'other',
];

// "2026-10-12" → "10.12.26". Pure string work so time zones never shift the day.
export function formatDate(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso ?? ''));
  if (!m) return '';
  return `${m[2]}.${m[3]}.${m[1].slice(2)}`;
}

// First link of a release in RELEASE_PLATFORMS order (any key wins as a fallback).
export function primaryLink(links) {
  if (!links) return null;
  for (const key of RELEASE_PLATFORMS) if (links[key]) return links[key];
  const rest = Object.values(links).find(Boolean);
  return rest ?? null;
}

// What the featured block on the first screen shows: now_playing when the
// dashboard set one, otherwise the newest release's cover (no audio, no video).
export function featuredOf(content) {
  if (content.now_playing) return content.now_playing;
  const newest = content.releases?.[0];
  if (!newest) return null;
  return {
    slug: newest.slug,
    title: newest.title,
    type: newest.type,
    tag: newest.tag,
    credit: newest.credit,
    art: newest.art,
    trackUrl: primaryLink(newest.links),
    video: null,
  };
}

export const FEATURED = featuredOf(CONTENT);
