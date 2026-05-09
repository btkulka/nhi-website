import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TopBar from './TopBar.jsx';

describe('<TopBar />', () => {
  it('renders the transmission tag and locale', () => {
    render(<TopBar />);
    expect(screen.getByText(/transmission 001/i)).toBeInTheDocument();
    expect(screen.getByText(/austin · tx/i)).toBeInTheDocument();
  });

  it('uses a banner role', () => {
    render(<TopBar />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
