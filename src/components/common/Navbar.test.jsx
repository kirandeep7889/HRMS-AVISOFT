import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import NavBar from './Navbar';
import { store } from '../../store/store';

describe('NavBar component', () => {
  test('renders logo ', () => {
    renderWithContext(
      <NavBar />
    );
    const logo = screen.getByTestId('logo');
    expect(logo).toBeInTheDocument();
   });
   test('render navigation links correctly',()=> {
    renderWithContext(
        <NavBar/>
    )
    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByText('About Us');
    expect(aboutLink).toBeInTheDocument();
  });

  test('renders Log In  when user is not authenticated', () => {
    renderWithContext(
          <NavBar />
    )
    const logInButton = screen.getByText('Log In');
    expect(logInButton).toBeInTheDocument();
    });
    test('renders Profile dropdown when user is authenticated', () => {
        renderWithContext(
              <NavBar />
        );
        const profileDropdown = screen.getByTestId('profile-dropdown');
        expect(profileDropdown).toBeInTheDocument(); 
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
