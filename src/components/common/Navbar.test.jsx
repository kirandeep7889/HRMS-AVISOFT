import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom'; 
import { Provider } from 'react-redux';
import NavBar from './Navbar';
import { createStore } from 'redux';
import rootReducer from '../../reducer';

const store = createStore(rootReducer, { auth: { token: null } });

// Mock useHistory hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(), 
}));


describe('NavBar component', () => {
  const renderWithContext = (element, store) => {
    return render(
      <MemoryRouter>
        <Provider store={store}>{element}</Provider>
      </MemoryRouter>
    );
  };

  test('renders logo', () => {
    renderWithContext(<NavBar />, store);
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();
  });

  test('renders search input and button', () => {
    renderWithContext(<NavBar />, store);
    const searchInput = screen.getByPlaceholderText('Search Employee..');
    const searchButton = screen.getByRole('button', { name: /search/i });
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test('renders Log In button when user is not authenticated', () => {
    renderWithContext(<NavBar />, store);
    const logInButton = screen.getByRole('button', { name: /log in/i });
    expect(logInButton).toBeInTheDocument();
  });

  test('renders ProfileDropDown when user is authenticated', () => {
    const authenticatedStore = createStore(rootReducer, { auth: { token: 'test-token' } });
    renderWithContext(<NavBar />, authenticatedStore);
    const profileDropDown = screen.getByTestId('profile-dropdown');
    expect(profileDropDown).toBeInTheDocument();
  });


});
