import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import LogBtn from './LogBtn';

describe('LogBtn', () => {
  test('renders button with correct text', () => {
    render(
      <Router>
        <LogBtn link="/" text="Home" />
      </Router>
    );

    expect(screen.getByRole('button')).toHaveTextContent('Home');
  });

  test('navigates to the specified link when clicked', () => {
    const { container } = render(
      <Router>
        <LogBtn link="/about" text="About" />
      </Router>
    );

    fireEvent.click(screen.getByRole('button'));

    expect(window.location.href).toBe('http://localhost/about');

    expect(container.querySelector('a')).toHaveAttribute('href', '/about');
  });

  test('applies hover styles when hovered over', () => {
    render(
      <Router>
        <LogBtn link="/" text="Home" />
      </Router>
    );

    const button = screen.getByRole('button');

    fireEvent.mouseEnter(button);

    expect(button).toHaveStyle('background-color: ButtonFace');

    fireEvent.mouseLeave(button);

    expect(button).toHaveStyle('background-color: ButtonFace');
  });
});
