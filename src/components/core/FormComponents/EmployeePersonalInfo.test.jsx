jest.mock('../../../assets/Images/placeholder.jpg', () => ({
  default: '../../../assets/Images/placeholder.jpg',
}));
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EmployeePersonalInfo from './EmployeePersonalInfo';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../store/store';

describe('EmployeePersonalInfo component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <EmployeePersonalInfo />
        </Provider>
      </BrowserRouter>
    );
  });

  it('renders input fields with correct placeholders', () => {
    expect(screen.getByPlaceholderText('Enter Your First Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Your Last Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Your Mobile Number')).toBeInTheDocument();
  });

  it('renders labels with correct inner text', () => {
    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('Department')).toBeInTheDocument();
  });

  it('renders select options with correct inner text', () => {
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText('Tester')).toBeInTheDocument();
    expect(screen.getByText('HR')).toBeInTheDocument();
  });

  it('renders submit button with correct inner text', () => {
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it('renders next step button with correct inner text', () => {
    expect(screen.getByText('Next Step')).toBeInTheDocument();
  });
});
