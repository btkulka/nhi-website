import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NextUp from './NextUp.jsx';

describe('<NextUp />', () => {
  it('renders nothing when next is null', () => {
    const { container } = render(<NextUp next={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders one mono line with the title and mm.dd.yy', () => {
    render(<NextUp next={{ title: 'making money solo', type: 'original', date: '2026-11-06' }} />);
    expect(screen.getByText('next · making money solo · 11.06.26')).toBeInTheDocument();
  });

  it('drops the date segment when there is no usable date', () => {
    render(<NextUp next={{ title: 'making money solo', date: null }} />);
    expect(screen.getByText('next · making money solo')).toBeInTheDocument();
  });
});
