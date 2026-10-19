import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import EmbedPlayer, { embedSrc } from './EmbedPlayer.jsx';

const sc = { title: 'a bar song (tipsy) [nhi flip]', embed: { provider: 'soundcloud', url: 'https://soundcloud.com/nhi-dj/tipsy' } };
const sp = { title: 'making money solo', embed: { provider: 'spotify', url: 'https://open.spotify.com/track/abc123', id: 'abc123' } };

describe('EmbedPlayer', () => {
  it('embeds the soundcloud widget on the permalink, in the accent colour, visual mode', () => {
    render(<EmbedPlayer track={sc} />);
    const frame = screen.getByTitle('a bar song (tipsy) [nhi flip] on soundcloud');
    expect(frame.tagName).toBe('IFRAME');
    expect(frame.getAttribute('src')).toContain(encodeURIComponent('https://soundcloud.com/nhi-dj/tipsy'));
    expect(frame.getAttribute('src')).toContain('color=%23cd2d44');
    expect(frame.getAttribute('src')).toContain('visual=true');
    expect(frame.getAttribute('allow')).toContain('autoplay');
  });

  it('embeds spotify by track id in the dark theme', () => {
    render(<EmbedPlayer track={sp} />);
    const frame = screen.getByTitle('making money solo on spotify');
    expect(frame.getAttribute('src')).toBe('https://open.spotify.com/embed/track/abc123?theme=0');
  });

  it('renders nothing without an embed, and embedSrc refuses what it does not know', () => {
    const { container } = render(<EmbedPlayer track={{ title: 'x', embed: null }} />);
    expect(container).toBeEmptyDOMElement();
    expect(embedSrc(null)).toBeNull();
    expect(embedSrc({ provider: 'bandcamp', url: 'https://x' })).toBeNull();
    expect(embedSrc({ provider: 'spotify', url: 'https://open.spotify.com/artist/x' })).toBeNull();
  });
});
