// jest.mock('../../../assets/Images/placeholder.jpg', () => ({
//   default: '../../../assets/Images/placeholder.jpg',
// }));

// // Your test code starts here
// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// import RenderSteps from './RendersSteps';
// import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { store } from '../../../store/store';
// import { useSelector } from 'react-redux';

// // Mocking the useSelector hook
// jest.mock('react-redux', () => ({
//   ...jest.requireActual('react-redux'),
//   useSelector: jest.fn(),
// }));

// // Helper function to render with context
// function renderWithContext(element) {
//   render(
//     <BrowserRouter>
//       <Provider store={store}>{element}</Provider>
//     </BrowserRouter>
//   );
// }

// test('renders correct steps and components based on step state', () => {
//   // Mocking the useSelector hook to return a specific step
//   useSelector.mockImplementation((selector) => selector({ employee: { step: 1 } }));

//   renderWithContext(<RenderSteps />);

//   // Assertions for step 1
//   expect(screen.getByText('Primary Details')).toBeInTheDocument();
//   expect(screen.getByText('1')).toBeInTheDocument();
//   expect(screen.queryByText('Personal Details')).toBeInTheDocument();
//   expect(screen.queryByText('Additional Details')).toBeInTheDocument();
//   expect(screen.getByTestId('PrimaryEmployeeDetails')).toBeInTheDocument();
//   expect(screen.queryByTestId('EmployeePersonalInfo')).not.toBeInTheDocument();
//   expect(screen.queryByTestId('EmployeeAdditionalDetails')).not.toBeInTheDocument();

//   // Update step to 2
//   useSelector.mockImplementation((selector) => selector({ employee: { step: 2 } }));

//   // Re-render with updated step
//   renderWithContext(<RenderSteps />);

//   // Assertions for step 2
//   expect(screen.getByText('Primary Details')).toBeInTheDocument();
//   expect(screen.getByText('Personal Details')).toBeInTheDocument();
//   expect(screen.getByText('2')).toBeInTheDocument();
//   expect(screen.queryByText('Additional Details')).toBeInTheDocument();
//   expect(screen.queryByTestId('PrimaryEmployeeDetails')).not.toBeInTheDocument();
//   expect(screen.getByTestId('EmployeePersonalInfo')).toBeInTheDocument();
//   expect(screen.queryByTestId('EmployeeAdditionalDetails')).not.toBeInTheDocument();

//   // Update step to 3
//   useSelector.mockImplementation((selector) => selector({ employee: { step: 3 } }));

//   // Re-render with updated step
//   renderWithContext(<RenderSteps />);

//   // Assertions for step 3
//   expect(screen.getByText('Primary Details')).toBeInTheDocument();
//   expect(screen.getByText('Personal Details')).toBeInTheDocument();
//   expect(screen.getByText('Additional Details')).toBeInTheDocument();
//   expect(screen.getByText('3')).toBeInTheDocument();
//   expect(screen.queryByTestId('PrimaryEmployeeDetails')).not.toBeInTheDocument();
//   expect(screen.queryByTestId('EmployeePersonalInfo')).not.toBeInTheDocument();
//   expect(screen.getByTestId('EmployeeAdditionalDetails')).toBeInTheDocument();
// });
