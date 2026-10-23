import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App.jsx';
import { CONTENT } from './content.js';

describe('<App />', () => {
  it('renders the major page regions in order', () => {
    render(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument();                  // TopBar
    expect(screen.getByLabelText('nhi')).toBeInTheDocument();                // Wordmark
    expect(screen.getByLabelText('now playing')).toBeInTheDocument();        // AudioBar
    expect(screen.getByLabelText('releases')).toBeInTheDocument();           // ReleaseList
    expect(screen.getByText(/^next · /)).toBeInTheDocument();                // NextUp
    expect(screen.getByLabelText(/listen and follow/i)).toBeInTheDocument(); // LinkList
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();             // Footer

    const order = [
      screen.getByRole('banner'),
      screen.getByLabelText('featured'),
      screen.getByLabelText('releases'),
      screen.getByText(/^next · /),
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
    for (const r of CONTENT.releases) {
      expect(screen.getByLabelText(`${r.title} on soundcloud`)).toHaveAttribute('href', r.links.soundcloud);
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
    expect(screen.getByText('nhi · transmission 006')).toBeInTheDocument();
    expect(screen.getByText(`v${CONTENT.version}`)).toBeInTheDocument();
  });

  it('drops the audio bar and features the newest cover when now_playing is null', () => {
    const { container } = render(<App content={{ ...CONTENT, now_playing: null }} />);
    expect(screen.queryByLabelText('now playing')).toBeNull();
    expect(container.querySelector('audio')).toBeNull();
    expect(container.querySelector('.hero video')).toBeNull();
    const newest = CONTENT.releases[0];
    const featured = screen.getByLabelText(`open ${newest.title} on soundcloud`);
    expect(featured).toHaveAttribute('href', newest.links.soundcloud);
    expect(featured.querySelector('img')).toHaveAttribute('src', newest.art);
  });

  it('drops the next line when next is null', () => {
    render(<App content={{ ...CONTENT, next: null }} />);
    expect(screen.queryByText(/^next · /)).toBeNull();
  });
});
