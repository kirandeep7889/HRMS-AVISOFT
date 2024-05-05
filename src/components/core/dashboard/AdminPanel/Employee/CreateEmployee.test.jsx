import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import CreateEmployee from "./CreateEmployee"
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../../../store/store';

jest.mock('../../../../../assets/Images/placeholder.jpg', () => 'placeholder.jpg');

describe('Create Employee Form', () => {
  test('renders email and password input fields with placeholders, labels, and validation errors', () => {
    renderWithContext(<CreateEmployee />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    expect(emailInput).toHaveAttribute('placeholder', 'Enter Your Email Address');
    expect(screen.getByText('Email Address')).toBeInTheDocument();

    expect(passwordInput).toHaveAttribute('placeholder', 'Enter Your Password');
    expect(screen.getByText('Password')).toBeInTheDocument();

    fireEvent.blur(emailInput);
    expect(screen.queryByText('Please enter a valid email address')).toBeNull();

    fireEvent.blur(passwordInput);
    expect(screen.queryByText('Password is required')).toBeNull();
    expect(screen.queryByText('Password must have at least 6 characters')).toBeNull();
  });


    test('submitting the form with empty fields displays validation errors', async () => {
        renderWithContext(<CreateEmployee />);

        const firstNameInput = screen.getByTestId('first-name-input');
        const lastNameInput = screen.getByTestId('last-name-input');
    
        fireEvent.submit(screen.getByTestId('create-employee-form'));

        expect(firstNameInput).toHaveAttribute('placeholder', 'Enter Your First Name');
        expect(lastNameInput).toHaveAttribute('placeholder', 'Enter Your Last Name');

        expect(screen.getByText('First Name')).toBeInTheDocument();
        expect(screen.getByText('Last Name')).toBeInTheDocument();
    });

    test('renders salary and position input fields with placeholders, labels, and unique test IDs', () => {
      renderWithContext(<CreateEmployee />);
  
      const salaryInput = screen.getByTestId('salary-input');
      const positionSelect = screen.getByTestId('position-select');
  
      expect(salaryInput).toHaveAttribute('placeholder', 'Enter The Salary');
      expect(screen.getByText('Salary')).toBeInTheDocument();
  
      expect(positionSelect).toBeInTheDocument();
      expect(screen.getByText('Position')).toBeInTheDocument();
    })

    test('renders form elements with unique test IDs', () => {
      renderWithContext(<CreateEmployee />);
  
      const joinDateInput = screen.getByTestId('join-date-input');
      const genderSelect = screen.getByTestId('gender-select');
      const dobInput = screen.getByTestId('date-of-birth-input');
      const roleSelect = screen.getByTestId('role-select');
      
      expect(screen.getByText('Join Date')).toBeInTheDocument();
  
      expect(genderSelect).toBeInTheDocument();
      expect(screen.getByText('Gender')).toBeInTheDocument();
  
      expect(dobInput).toBeInTheDocument();
      expect(screen.getByText('Date of Birth')).toBeInTheDocument();
  
      expect(roleSelect).toBeInTheDocument();
      expect(screen.getByText('Role')).toBeInTheDocument();
  
      const submitButton = screen.getByTestId('submit-button');
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveTextContent('Submit');
  });
  
});


function renderWithContext(element) {
  render(
    <BrowserRouter>
      <Provider store={store}>
        {element}
      </Provider>
    </BrowserRouter>
  );
}
