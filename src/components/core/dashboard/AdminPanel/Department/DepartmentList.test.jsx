import React from 'react';
import { render, screen } from '@testing-library/react';
import DepartmentList from './DepartmentList';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../../../store/store';

describe('DepartmentList Component', () => {
  it('renders the input fields, placeholders, inner texts, and icons correctly', () => {
    // Render the component
    renderWithContext(<DepartmentList />);

    // Check if Department List title is rendered
    expect(screen.getByText('Department List', { selector: 'div.text-xl' })).toBeInTheDocument();

    // Check if Add Department button is rendered
    expect(screen.getByText('Add Department')).toBeInTheDocument();

    // Check if Department Name header is rendered
    expect(screen.getByTestId('Department-Name-header')).toBeInTheDocument();

    // Check if Department Manager header is rendered
    expect(screen.getByTestId('Department-Manager-header')).toBeInTheDocument();

    // Check if Department Description header is rendered
    expect(screen.getByTestId('Department-Description-header')).toBeInTheDocument();

    // Check if Action header is rendered
    expect(screen.getByTestId('action-header')).toBeInTheDocument();
  });
});

function renderWithContext(element) {
  render(
    <BrowserRouter>
      <Provider store={store}>{element}</Provider>
    </BrowserRouter>
  );
}
