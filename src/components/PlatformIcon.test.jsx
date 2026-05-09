import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import PlatformIcon from './PlatformIcon.jsx';

describe('<PlatformIcon />', () => {
  it.each(['spotify', 'soundcloud', 'instagram', 'tiktok'])(
    'renders an svg for %s',
    (platform) => {
      const { container } = render(<PlatformIcon platform={platform} />);
      const svg = container.querySelector('svg.icon');
      expect(svg).not.toBeNull();
    },
  );

  it('renders nothing for an unknown platform', () => {
    const { container } = render(<PlatformIcon platform="myspace" />);
    expect(container).toBeEmptyDOMElement();
  });
});
