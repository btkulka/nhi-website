import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TopBar from './TopBar.jsx';

const artist = { name: 'nhi', city: 'austin · tx', tagline: 'patient music for patient listeners', transmission: 6 };

describe('<TopBar />', () => {
  it('renders the zero-padded transmission and the city', () => {
    render(<TopBar artist={artist} />);
    expect(screen.getByText('nhi · transmission 006')).toBeInTheDocument();
    expect(screen.getByText('austin · tx')).toBeInTheDocument();
  });

  it('pads to three digits and no further', () => {
    render(<TopBar artist={{ ...artist, transmission: 12 }} />);
    expect(screen.getByText('nhi · transmission 012')).toBeInTheDocument();
  });

  it('uses a banner role', () => {
    render(<TopBar artist={artist} />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
