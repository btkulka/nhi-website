import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import PlatformIcon, { platformLabel } from './PlatformIcon.jsx';

const BRANDS = ['spotify', 'soundcloud', 'youtube', 'apple_music', 'bandcamp', 'instagram', 'tiktok'];
const GLYPHS = ['email', 'hypeddit', 'smart_link', 'other'];

describe('<PlatformIcon />', () => {
  it.each(BRANDS)('renders a brand svg in the text colour for %s', (platform) => {
    const { container } = render(<PlatformIcon platform={platform} />);
    const svg = container.querySelector('svg.icon');
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute('fill', 'currentColor');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it.each(GLYPHS)('renders a lucide outline svg for %s', (platform) => {
    const { container } = render(<PlatformIcon platform={platform} />);
    const svg = container.querySelector('svg.icon');
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute('stroke', 'currentColor');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('never carries an inline brand colour', () => {
    for (const platform of [...BRANDS, ...GLYPHS]) {
      const { container, unmount } = render(<PlatformIcon platform={platform} />);
      expect(container.innerHTML).not.toMatch(/#[0-9a-f]{3,6}/i);
      unmount();
    }
  });

  it('renders nothing for an unknown platform', () => {
    const { container } = render(<PlatformIcon platform="myspace" />);
    expect(container).toBeEmptyDOMElement();
  });

  it('turns platform keys into readable labels', () => {
    expect(platformLabel('apple_music')).toBe('apple music');
    expect(platformLabel('smart_link')).toBe('smart link');
    expect(platformLabel('soundcloud')).toBe('soundcloud');
  });
});
