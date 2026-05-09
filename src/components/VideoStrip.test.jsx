import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import VideoStrip from './VideoStrip.jsx';
import { NOW_PLAYING } from '../content.js';

describe('<VideoStrip />', () => {
  it('links to the now-playing track url', () => {
    render(<VideoStrip />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', NOW_PLAYING.trackUrl);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link.getAttribute('rel')).toMatch(/noopener/);
  });

  it('renders the new + title labels', () => {
    render(<VideoStrip />);
    expect(screen.getByText('new')).toBeInTheDocument();
    expect(screen.getByText(/i need a forest fire/i)).toBeInTheDocument();
  });

  it('mounts a video element with two sources', () => {
    const { container } = render(<VideoStrip />);
    const video = container.querySelector('video');
    expect(video).not.toBeNull();
    const sources = container.querySelectorAll('video source');
    expect(sources).toHaveLength(2);
  });
});
