import { fireEvent, render, screen } from "@testing-library/react";
import LoginFormTemplate from "./LoginFormTemplate";
import React from "react";
import { store } from "../../../store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe('Login Components', () => {
  test('render the main heading with proper text content', () => {
    renderWithContext(<LoginFormTemplate />);
    const mainHeading=screen.getByTestId('main-heading')
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading).toHaveTextContent('Sign-In Portal')
  });

   test('render the login heading with proper text content',()=> {
    renderWithContext(<LoginFormTemplate />);
    const loginHeading = screen.getByTestId('login-heading');
    expect(loginHeading).toBeInTheDocument();
    expect(loginHeading).toHaveTextContent('Sign in to your account');
   });

   test('renders email label with correct test id', () => {
    renderWithContext(<LoginFormTemplate />);
    const emailLabel = screen.getByTestId('email-label');
    expect(emailLabel).toBeInTheDocument();
    expect(emailLabel).toHaveTextContent('Email Address');
   });  

   test('renders email input field with correct placeholder', () => {
    renderWithContext(<LoginFormTemplate />);
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('placeholder', 'Enter Email Address');
  });

  test('renders password label with correct test id', () => {
    renderWithContext(<LoginFormTemplate />);
    const passwordLabel = screen.getByTestId('password-label');
    expect(passwordLabel).toBeInTheDocument();
    expect(passwordLabel).toHaveTextContent('Password');
  });
    
  test('renders password text', () => {
    renderWithContext(<LoginFormTemplate />);
    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
  
test('renders "Forgot Password?" link', () => {
  renderWithContext(<LoginFormTemplate />);
  const forgotPasswordLink = screen.getByTestId('forgot-password-link');
  expect(forgotPasswordLink).toBeInTheDocument();
});

test('renders submit button', () => {
  renderWithContext(<LoginFormTemplate />);
  const submitButton = screen.getByTestId('submit-button');
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toHaveTextContent('Sign In');
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
