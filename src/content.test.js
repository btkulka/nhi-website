import { describe, it, expect } from 'vitest';
import CONTENT, {
  LINKS,
  NOW_PLAYING,
  FEATURED,
  RELEASE_PLATFORMS,
  formatDate,
  featuredOf,
  primaryLink,
} from './content.js';
import PUBLIC_COPY from '../public/content.json';

const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;
const SAFE_HREF = /^(https:\/\/|mailto:)/;

describe('content contract', () => {
  it('has every top-level key the dashboard writes', () => {
    for (const key of ['generated_at', 'content_hash', 'version', 'artist', 'links', 'now_playing', 'releases', 'next']) {
      expect(CONTENT).toHaveProperty(key);
    }
    expect(CONTENT.generated_at).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(CONTENT.content_hash).toMatch(/^[0-9a-f]{64}$/);
    expect(CONTENT.version).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it('public/content.json is an exact copy of src/content.json', () => {
    expect(PUBLIC_COPY).toEqual(CONTENT);
  });

  it('describes the artist', () => {
    expect(CONTENT.artist).toMatchObject({
      name: expect.any(String),
      city: expect.any(String),
      tagline: expect.any(String),
      transmission: expect.any(Number),
    });
  });

  it('re-exports the old names for the older components', () => {
    expect(LINKS).toBe(CONTENT.links);
    expect(NOW_PLAYING).toBe(CONTENT.now_playing);
  });
});

describe('links', () => {
  it('covers the expected platforms, each once', () => {
    const platforms = LINKS.map((l) => l.platform);
    expect(platforms).toEqual(
      expect.arrayContaining(['spotify', 'soundcloud', 'instagram', 'tiktok', 'youtube']),
    );
    expect(new Set(platforms).size).toBe(platforms.length);
  });

  it('every link uses an https or mailto url and carries a handle', () => {
    for (const link of LINKS) {
      expect(link.href).toMatch(SAFE_HREF);
      expect(link.handle).toEqual(expect.any(String));
      if ('label' in link) expect(link.label).toEqual(expect.any(String));
    }
  });
});

describe('now_playing', () => {
  it('is null or has the fields the player and the featured block need', () => {
    if (NOW_PLAYING === null) return;
    expect(NOW_PLAYING).toMatchObject({
      slug: expect.any(String),
      title: expect.any(String),
      tag: expect.any(String),
      credit: expect.any(String),
      src: expect.any(String),
      art: expect.any(String),
      trackUrl: expect.stringMatching(SAFE_HREF),
    });
    if (NOW_PLAYING.video) {
      expect(NOW_PLAYING.video).toMatchObject({ src: expect.any(String), poster: expect.any(String) });
    }
  });
});

describe('releases', () => {
  it('is newest first', () => {
    const dates = CONTENT.releases.map((r) => r.date);
    const sorted = [...dates].sort().reverse();
    expect(dates).toEqual(sorted);
  });

  it('every release has slug, title, date, art and at least one known link', () => {
    const slugs = new Set();
    for (const r of CONTENT.releases) {
      expect(r.slug).toMatch(/^[a-z0-9-]+$/);
      expect(slugs.has(r.slug)).toBe(false);
      slugs.add(r.slug);
      expect(r.title).toEqual(expect.any(String));
      expect(r.title.length).toBeGreaterThan(0);
      expect(r.date).toMatch(ISO_DAY);
      expect(r.art).toMatch(/^\//);
      expect(r.tag).toEqual(expect.any(String));
      const keys = Object.keys(r.links ?? {});
      expect(keys.length).toBeGreaterThan(0);
      for (const key of keys) {
        expect(RELEASE_PLATFORMS).toContain(key);
        expect(r.links[key]).toMatch(SAFE_HREF);
      }
    }
  });
});

describe('next', () => {
  it('is null or a scheduled title and date that is not a placeholder', () => {
    if (CONTENT.next === null) return;
    expect(CONTENT.next).toMatchObject({ title: expect.any(String), date: expect.stringMatching(ISO_DAY) });
    const title = CONTENT.next.title.toLowerCase();
    expect(title).not.toMatch(/\bflip \d/);
    expect(title).not.toMatch(/\bep \(/);
    expect(title).not.toMatch(/\bor vip\b/);
    expect(title.trim().length).toBeGreaterThan(0);
  });
});

describe('formatDate', () => {
  it('renders mm.dd.yy', () => {
    expect(formatDate('2026-10-12')).toBe('10.12.26');
    expect(formatDate('2026-04-18T00:00:00.000Z')).toBe('04.18.26');
  });

  it('returns an empty string for anything else', () => {
    expect(formatDate(null)).toBe('');
    expect(formatDate('')).toBe('');
    expect(formatDate('soon')).toBe('');
  });
});

describe('featuredOf', () => {
  const releases = [
    { slug: 'a', title: 'a', type: 'flip', tag: 'nhi flip', credit: 'x', date: '2026-10-12', art: '/releases/a/cover.jpg',
      links: { hypeddit: 'https://hypeddit.com/nhi/a', soundcloud: 'https://soundcloud.com/nhi-dj/a' } },
    { slug: 'b', title: 'b', type: 'original', tag: 'nhi.001', credit: '', date: '2026-04-18', art: '/releases/b/cover.jpg',
      links: { soundcloud: 'https://soundcloud.com/nhi-dj/b' } },
  ];

  it('returns now_playing when the dashboard set one', () => {
    expect(featuredOf(CONTENT)).toBe(CONTENT.now_playing);
    expect(FEATURED).toBe(CONTENT.now_playing);
  });

  it('falls back to the newest release cover with no video when now_playing is null', () => {
    const featured = featuredOf({ now_playing: null, releases });
    expect(featured).toMatchObject({ slug: 'a', title: 'a', art: '/releases/a/cover.jpg', video: null });
    expect(featured.trackUrl).toBe('https://soundcloud.com/nhi-dj/a');
    expect(featured.src).toBeUndefined();
  });

  it('is null when there is nothing to feature', () => {
    expect(featuredOf({ now_playing: null, releases: [] })).toBeNull();
  });
});

describe('primaryLink', () => {
  it('prefers soundcloud, then the contract order, then anything', () => {
    expect(primaryLink({ hypeddit: 'h', soundcloud: 's' })).toBe('s');
    expect(primaryLink({ hypeddit: 'h', spotify: 'p' })).toBe('p');
    expect(primaryLink({ mystery: 'm' })).toBe('m');
    expect(primaryLink({})).toBeNull();
    expect(primaryLink(undefined)).toBeNull();
  });
});
