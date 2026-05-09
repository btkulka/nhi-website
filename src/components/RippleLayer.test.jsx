import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import RippleLayer from './RippleLayer.jsx';

describe('<RippleLayer />', () => {
  it('renders nothing visible to the DOM', () => {
    const { container } = render(<RippleLayer />);
    expect(container).toBeEmptyDOMElement();
  });

  it('appends a ripple span to the nearest interactive ancestor on pointerdown', () => {
    const button = document.createElement('button');
    button.textContent = 'click me';
    document.body.appendChild(button);
    render(<RippleLayer />);

    button.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: 5, clientY: 5 }));
    expect(button.querySelector('span.ripple')).not.toBeNull();

    document.body.removeChild(button);
  });

  it('ignores pointerdown on non-interactive elements', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    render(<RippleLayer />);

    div.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: 5, clientY: 5 }));
    expect(div.querySelector('span.ripple')).toBeNull();

    document.body.removeChild(div);
  });
});
