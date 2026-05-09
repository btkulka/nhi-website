import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import Footer from './Footer.jsx';

describe('<Footer />', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-05-08T12:34:56Z'));
  });
  afterEach(() => { vi.useRealTimers(); });

  it('renders the current UTC time on mount', () => {
    render(<Footer />);
    expect(screen.getByText('12:34:56 utc')).toBeInTheDocument();
  });

  it('ticks the time once per second', () => {
    render(<Footer />);
    expect(screen.getByText('12:34:56 utc')).toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(1000); });
    expect(screen.getByText('12:34:57 utc')).toBeInTheDocument();
  });

  it('links the FM mark with safe rel attrs', () => {
    render(<Footer />);
    const link = screen.getByLabelText('force majeure');
    expect(link).toHaveAttribute('href', 'https://www.forcemajeure.vip');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link.getAttribute('rel')).toMatch(/noopener/);
  });
});
