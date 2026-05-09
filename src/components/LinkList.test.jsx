import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LinkList from './LinkList.jsx';

const items = [
  { platform: 'spotify',    href: 'https://open.spotify.com/artist/abc' },
  { platform: 'soundcloud', href: 'https://soundcloud.com/foo' },
];

describe('<LinkList />', () => {
  it('renders one anchor per item with the right href', () => {
    render(<LinkList items={items} />);
    for (const { platform, href } of items) {
      const link = screen.getByLabelText(platform);
      expect(link).toHaveAttribute('href', href);
    }
  });

  it('opens links in a new tab safely', () => {
    render(<LinkList items={items} />);
    for (const { platform } of items) {
      const link = screen.getByLabelText(platform);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link.getAttribute('rel')).toMatch(/noopener/);
    }
  });

  it('renders nothing when items is empty', () => {
    const { container } = render(<LinkList items={[]} />);
    expect(container.querySelectorAll('a.link')).toHaveLength(0);
  });
});
