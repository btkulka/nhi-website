import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App.jsx';
import { CONTENT, primaryLink } from './content.js';
import { platformLabel } from './components/PlatformIcon.jsx';

describe('<App />', () => {
  it('renders the major page regions in order', () => {
    render(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument();                  // TopBar
    expect(screen.getByLabelText('nhi')).toBeInTheDocument();                // Wordmark
    expect(screen.getByLabelText('now playing')).toBeInTheDocument();        // AudioBar
    expect(screen.getByLabelText('releases')).toBeInTheDocument();           // ReleaseList
    // NextUp only renders while content.json names a drop ahead.
    if (CONTENT.next) expect(screen.getByText(/^next · /)).toBeInTheDocument();
    expect(screen.getByLabelText(/listen and follow/i)).toBeInTheDocument(); // LinkList
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();             // Footer

    const order = [
      screen.getByRole('banner'),
      screen.getByLabelText('featured'),
      screen.getByLabelText('releases'),
      ...(CONTENT.next ? [screen.getByText(/^next · /)] : []),
      screen.getByLabelText(/listen and follow/i),
      screen.getByRole('contentinfo'),
    ];
    for (let i = 1; i < order.length; i++) {
      expect(order[i - 1].compareDocumentPosition(order[i]) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    }
  });

  it('renders every release and the next line from content.json', () => {
    render(<App />);
    expect(screen.getByText(`releases · ${CONTENT.releases.length}`)).toBeInTheDocument();
    // Every link each row carries, whatever the platform: originals live on Spotify, not SoundCloud.
    for (const r of CONTENT.releases) {
      for (const [platform, href] of Object.entries(r.links)) {
        expect(screen.getByLabelText(`${r.title} on ${platformLabel(platform)}`)).toHaveAttribute('href', href);
      }
    }
    // Read the next drop from content.json: a hard-coded date breaks every time a release moves.
    if (CONTENT.next) {
      const [y, m, d] = CONTENT.next.date.split('-');
      expect(screen.getByText(`next · ${CONTENT.next.title} · ${m}.${d}.${y.slice(2)}`)).toBeInTheDocument();
    }
  });

  it('wires every content link into the page', () => {
    render(<App />);
    for (const { platform, href, label } of CONTENT.links) {
      expect(screen.getByLabelText(label || platform)).toHaveAttribute('href', href);
    }
  });

  it('stamps the transmission and the version from content.json', () => {
    render(<App />);
    const transmission = String(CONTENT.artist.transmission).padStart(3, '0');
    expect(screen.getByText(`${CONTENT.artist.name} · transmission ${transmission}`)).toBeInTheDocument();
    expect(screen.getByText(`v${CONTENT.version}`)).toBeInTheDocument();
  });

  it('drops the audio bar and features the newest cover when now_playing is null', () => {
    const { container } = render(<App content={{ ...CONTENT, now_playing: null }} />);
    expect(screen.queryByLabelText('now playing')).toBeNull();
    expect(container.querySelector('audio')).toBeNull();
    expect(container.querySelector('.hero video')).toBeNull();
    const newest = CONTENT.releases[0];
    const href = primaryLink(newest.links);
    const title = newest.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const featured = screen.getByLabelText(new RegExp(`^open ${title}( on \\w+)?$`));
    expect(featured).toHaveAttribute('href', href);
    expect(featured.querySelector('img')).toHaveAttribute('src', newest.art);
  });

  it('drops the next line when next is null', () => {
    render(<App content={{ ...CONTENT, next: null }} />);
    expect(screen.queryByText(/^next · /)).toBeNull();
  });
});
