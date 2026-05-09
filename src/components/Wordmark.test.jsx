import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Wordmark from './Wordmark.jsx';

describe('<Wordmark />', () => {
  it('renders the three letters of nhi', () => {
    const { container } = render(<Wordmark />);
    const letters = container.querySelectorAll('.letter');
    expect(letters).toHaveLength(3);
    expect([...letters].map((l) => l.textContent)).toEqual(['n', 'h', 'i']);
  });

  it('exposes nhi as an aria-label', () => {
    render(<Wordmark />);
    expect(screen.getByLabelText('nhi')).toBeInTheDocument();
  });
});
