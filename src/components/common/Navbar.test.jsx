import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import NavBar from './Navbar';
import { createStore } from 'redux'; // Import createStore from redux
import rootReducer from '../../reducer';

// Mock the Redux store state to simulate user not authenticated
const store = createStore(rootReducer, { auth: { token: null } });

describe('NavBar component', () => {
  test('renders logo ', () => {
    renderWithContext(<NavBar />);
    const logo = screen.getByTestId('logo');
    expect(logo).toBeInTheDocument();
  });

  test('render navigation links correctly', () => {
    renderWithContext(<NavBar />);
    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByText('About Us');
    expect(aboutLink).toBeInTheDocument();
  });

  test('renders Log In  when user is not authenticated', () => {
    renderWithContext(<NavBar />);
    const logInButton = screen.getByRole('button', { name: /log in/i });
    expect(logInButton).toBeInTheDocument();
  });
});

function renderWithContext(element) {
  render(
    <BrowserRouter>
      <Provider store={store}>{element}</Provider>
    </BrowserRouter>
  );
}
