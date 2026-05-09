import { describe, it, expect } from 'vitest';
import { LINKS, NOW_PLAYING } from './content.js';

describe('LINKS', () => {
  it('has an entry for each expected platform', () => {
    const platforms = LINKS.map((l) => l.platform);
    expect(platforms).toEqual(
      expect.arrayContaining(['spotify', 'soundcloud', 'instagram', 'tiktok']),
    );
  });

  it('every link has a valid https url', () => {
    for (const link of LINKS) {
      expect(link.href).toMatch(/^https:\/\//);
    }
  });
});

describe('NOW_PLAYING', () => {
  it('has the fields the player needs', () => {
    expect(NOW_PLAYING).toMatchObject({
      title: expect.any(String),
      attribution: expect.any(String),
      src: expect.any(String),
      art: expect.any(String),
    });
  });
});
