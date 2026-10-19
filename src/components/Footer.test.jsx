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
    render(<Footer version="0.2.0" />);
    expect(screen.getByText('12:34:56 utc')).toBeInTheDocument();
  });

  it('ticks the time once per second', () => {
    render(<Footer version="0.2.0" />);
    expect(screen.getByText('12:34:56 utc')).toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(1000); });
    expect(screen.getByText('12:34:57 utc')).toBeInTheDocument();
  });

  it('stamps the content version', () => {
    render(<Footer version="0.2.0" />);
    expect(screen.getByText('v0.2.0')).toBeInTheDocument();
  });

  it('carries no force majeure mark or link', () => {
    const { container } = render(<Footer version="0.2.0" />);
    expect(screen.queryByLabelText('force majeure')).toBeNull();
    expect(container.querySelector('a')).toBeNull();
    expect(container.querySelector('img')).toBeNull();
  });
});
