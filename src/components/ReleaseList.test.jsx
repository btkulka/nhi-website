import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import ReleaseList from './ReleaseList.jsx';

const releases = [
  { slug: 'million-dollar-baby', title: 'million dollar baby', type: 'flip', tag: 'nhi flip', credit: 'tommy richman', date: '2026-10-12',
    art: '/releases/million-dollar-baby/cover.jpg',
    links: { hypeddit: 'https://hypeddit.com/nhi/million-dollar-baby', soundcloud: 'https://soundcloud.com/nhi-dj/million-dollar-baby-nhi-flip' } },
  { slug: 'the-gamut', title: 'the gamut', type: 'original', tag: 'nhi.001', credit: '', date: '2026-04-18',
    art: '/releases/the-gamut/cover.jpg',
    links: { soundcloud: 'https://soundcloud.com/nhi-dj/the-gamut', apple_music: 'https://music.apple.com/us/album/the-gamut/1' } },
];

describe('<ReleaseList />', () => {
  it('renders a labelled section with a counted eyebrow', () => {
    render(<ReleaseList releases={releases} />);
    expect(screen.getByLabelText('releases')).toBeInTheDocument();
    expect(screen.getByText('releases · 2')).toBeInTheDocument();
  });

  it('renders one article per release with title, eyebrow and lazy cover', () => {
    const { container } = render(<ReleaseList releases={releases} />);
    const rows = container.querySelectorAll('article.release');
    expect(rows).toHaveLength(2);

    expect(screen.getByText('million dollar baby')).toBeInTheDocument();
    expect(screen.getByText('nhi flip · 10.12.26')).toBeInTheDocument();
    expect(screen.getByText('nhi.001 · 04.18.26')).toBeInTheDocument();

    for (const img of container.querySelectorAll('img.release-art')) {
      expect(img).toHaveAttribute('loading', 'lazy');
      expect(img).toHaveAttribute('alt', '');
    }
    expect(rows[0].querySelector('img')).toHaveAttribute('src', releases[0].art);
  });

  it('marks only the newest row as new', () => {
    const { container } = render(<ReleaseList releases={releases} />);
    const marks = screen.getAllByText('new');
    expect(marks).toHaveLength(1);
    const rows = container.querySelectorAll('article.release');
    expect(within(rows[0]).getByText('new')).toBeInTheDocument();
    expect(within(rows[1]).queryByText('new')).toBeNull();
    expect(rows[0].querySelector('.release-eyebrow')).toHaveTextContent('new · nhi flip · 10.12.26');
  });

  it('shows the credit only when there is one', () => {
    const { container } = render(<ReleaseList releases={releases} />);
    expect(screen.getByText('tommy richman')).toBeInTheDocument();
    const rows = container.querySelectorAll('article.release');
    expect(rows[1].querySelector('.release-credit')).toBeNull();
  });

  it('renders a text-colour platform link for every key in links, soundcloud first', () => {
    render(<ReleaseList releases={releases} />);
    const sc = screen.getByLabelText('million dollar baby on soundcloud');
    expect(sc).toHaveAttribute('href', releases[0].links.soundcloud);
    expect(sc).toHaveAttribute('target', '_blank');
    expect(sc.getAttribute('rel')).toMatch(/noopener/);
    expect(sc.querySelector('svg.icon')).not.toBeNull();
    expect(sc.querySelector('svg')).toHaveAttribute('fill', 'currentColor');

    const hd = screen.getByLabelText('million dollar baby on hypeddit');
    expect(hd).toHaveAttribute('href', releases[0].links.hypeddit);
    expect(sc.compareDocumentPosition(hd) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    expect(screen.getByLabelText('the gamut on apple music')).toHaveAttribute('href', releases[1].links.apple_music);
  });

  it('renders nothing for an empty list', () => {
    const { container } = render(<ReleaseList releases={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
