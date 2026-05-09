import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AudioBar from './AudioBar.jsx';

const track = {
  title: 'i need a forest fire',
  flipTag: 'nhi flip',
  attribution: 'james blake · bon iver',
  src: '/audio/test.mp3',
  art: '/images/test.jpg',
  trackUrl: 'https://soundcloud.com/nhi-dj/test',
};

describe('<AudioBar />', () => {
  it('renders the track metadata', () => {
    render(<AudioBar track={track} />);
    expect(screen.getByText(track.title)).toBeInTheDocument();
    expect(screen.getByText(track.flipTag)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(track.attribution, 'i'))).toBeInTheDocument();
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
});
