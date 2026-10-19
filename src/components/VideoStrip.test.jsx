import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import VideoStrip from './VideoStrip.jsx';

const withVideo = {
  slug: 'i-need-a-forest-fire',
  title: 'i need a forest fire',
  tag: 'nhi flip',
  art: '/releases/i-need-a-forest-fire/cover.jpg',
  trackUrl: 'https://soundcloud.com/nhi-dj/i-need-a-forest-fire',
  video: { src: '/releases/i-need-a-forest-fire/canvas.mp4', poster: '/releases/i-need-a-forest-fire/poster.jpg' },
};

const stillOnly = {
  slug: 'million-dollar-baby',
  title: 'million dollar baby',
  tag: 'nhi flip',
  art: '/releases/million-dollar-baby/cover.jpg',
  trackUrl: 'https://hypeddit.com/nhi/million-dollar-baby',
  video: null,
};

describe('<VideoStrip />', () => {
  it('links to the track url safely', () => {
    render(<VideoStrip track={withVideo} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', withVideo.trackUrl);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link.getAttribute('rel')).toMatch(/noopener/);
    expect(link).toHaveAttribute('aria-label', 'open i need a forest fire on soundcloud');
  });

  it('renders the featured + title labels', () => {
    render(<VideoStrip track={withVideo} />);
    expect(screen.getByText('featured')).toBeInTheDocument();
    expect(screen.getByText('i need a forest fire')).toBeInTheDocument();
  });

  it('mounts one video source with the poster when a video is set', () => {
    const { container } = render(<VideoStrip track={withVideo} />);
    const video = container.querySelector('video');
    expect(video).not.toBeNull();
    expect(video).toHaveAttribute('poster', withVideo.video.poster);
    const sources = container.querySelectorAll('video source');
    expect(sources).toHaveLength(1);
    expect(sources[0]).toHaveAttribute('src', withVideo.video.src);
    expect(container.querySelector('img')).toBeNull();
  });

  it('falls back to the art as the poster when the video has none', () => {
    const { container } = render(<VideoStrip track={{ ...withVideo, video: { src: withVideo.video.src } }} />);
    expect(container.querySelector('video')).toHaveAttribute('poster', withVideo.art);
  });

  it('shows the cover art in the same frame when there is no video', () => {
    const { container } = render(<VideoStrip track={stillOnly} />);
    expect(container.querySelector('video')).toBeNull();
    const img = container.querySelector('a.video-strip img.video-still');
    expect(img).toHaveAttribute('src', stillOnly.art);
    expect(screen.getByRole('link')).toHaveAttribute('aria-label', 'open million dollar baby');
  });

  it('renders nothing without a track', () => {
    const { container } = render(<VideoStrip track={null} />);
    expect(container).toBeEmptyDOMElement();
  });
});
