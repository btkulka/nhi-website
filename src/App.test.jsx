import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App.jsx';
import { LINKS } from './content.js';

describe('<App />', () => {
  it('renders the major page regions', () => {
    render(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument();         // TopBar
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();    // Footer
    expect(screen.getByLabelText('nhi')).toBeInTheDocument();       // Wordmark
    expect(screen.getByLabelText('now playing')).toBeInTheDocument(); // AudioBar
    expect(screen.getByLabelText(/listen and follow/i)).toBeInTheDocument(); // LinkList
  });

  it('wires every content link into the page', () => {
    render(<App />);
    for (const { platform, href, label } of LINKS) {
      expect(screen.getByLabelText(label || platform)).toHaveAttribute('href', href);
    }
  });
});
