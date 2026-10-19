import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AudioBar from './AudioBar.jsx';

const track = {
  slug: 'i-need-a-forest-fire',
  title: 'i need a forest fire',
  type: 'flip',
  tag: 'nhi flip',
  credit: 'james blake · bon iver',
  src: '/releases/i-need-a-forest-fire/preview.mp3',
  art: '/releases/i-need-a-forest-fire/cover.jpg',
  trackUrl: 'https://soundcloud.com/nhi-dj/i-need-a-forest-fire',
};

describe('<AudioBar />', () => {
  it('renders the track metadata with the credit under the title', () => {
    render(<AudioBar track={track} />);
    expect(screen.getByText(track.title)).toBeInTheDocument();
    expect(screen.getByText(track.tag)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(track.credit, 'i'))).toBeInTheDocument();
  });

  it('mounts an audio element pointing at the track src', () => {
    const { container } = render(<AudioBar track={track} />);
    const audio = container.querySelector('audio');
    expect(audio).not.toBeNull();
    expect(audio.getAttribute('src')).toBe(track.src);
  });

  it('starts in a paused state with a play button', () => {
    render(<AudioBar track={track} />);
    expect(screen.getByLabelText('play')).toBeInTheDocument();
  });

  it('flips the play button label when the audio element fires play/pause', () => {
    const { container } = render(<AudioBar track={track} />);
    const audio = container.querySelector('audio');

    fireEvent.play(audio);
    expect(screen.getByLabelText('pause')).toBeInTheDocument();

    fireEvent.pause(audio);
    expect(screen.getByLabelText('play')).toBeInTheDocument();
  });

  it('exposes a soundcloud footnote link when trackUrl is provided', () => {
    render(<AudioBar track={track} />);
    const link = screen.getByLabelText('open on soundcloud');
    expect(link).toHaveAttribute('href', track.trackUrl);
  });

  it('omits the soundcloud footnote when trackUrl is missing', () => {
    render(<AudioBar track={{ ...track, trackUrl: undefined }} />);
    expect(screen.queryByLabelText('open on soundcloud')).toBeNull();
  });

  it('omits the credit line when the credit is empty', () => {
    const { container } = render(<AudioBar track={{ ...track, credit: '' }} />);
    expect(container.querySelector('.meta-attribution')).toBeNull();
  });

  it('renders nothing at all when now_playing is null', () => {
    const { container } = render(<AudioBar track={null} />);
    expect(container).toBeEmptyDOMElement();
    expect(screen.queryByLabelText('now playing')).toBeNull();
    expect(container.querySelector('audio')).toBeNull();
  });
});
