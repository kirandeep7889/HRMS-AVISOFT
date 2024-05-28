// jest.mock('../../../assets/Images/placeholder.jpg', () => ({
//     default: '../../../assets/Images/placeholder.jpg',
//   }));
//   import React from 'react';
//   import { render, screen, waitFor } from '@testing-library/react';
//   import { Provider, useSelector } from 'react-redux';
//   import { BrowserRouter } from 'react-router-dom';
//   import { store } from '../../../store/store';
//   import RenderSteps from './RendersSteps';
  
//   jest.mock('react-redux', () => ({
//     useSelector: jest.fn(),
//   }));
  
//   describe('RenderSteps Component', () => {
//     afterEach(() => {
//       jest.clearAllMocks();
//     });
  
//     test('renders PrimaryEmployeeDetails when step is 1', async () => {
//       useSelector.mockReturnValue({ step: 1 });
//       renderWithContext(<RenderSteps />);
//       // Wait for the component to appear
//       await waitFor(() => {
//         expect(screen.getByTestId('primary-employee-details')).toBeInTheDocument();
//       });
//     });
  
//     test('renders EmployeePersonalInfo when step is 2', async () => {
//       useSelector.mockReturnValue({ step: 2 });
//       renderWithContext(<RenderSteps />);
//       // Wait for the component to appear
//       await waitFor(() => {
//         expect(screen.getByTestId('employee-personal-info')).toBeInTheDocument();
//       });
//     });
  
//     test('renders EmployeeAdditionalDetails when step is 3', async () => {
//       useSelector.mockReturnValue({ step: 3 });
//       renderWithContext(<RenderSteps />);
//       // Wait for the component to appear
//       await waitFor(() => {
//         expect(screen.getByTestId('employee-additional-details')).toBeInTheDocument();
//       });
//     });
  
//     test('renders correct progress indicator for each step', async () => {
//       useSelector.mockReturnValue({ step: 2 });
//       renderWithContext(<RenderSteps />);
//       await waitFor(() => {
//         expect(screen.getByText('1').parentElement).toHaveClass('bg-gray-900 border-white text-white');
//         expect(screen.getByText('2').parentElement).toHaveClass('bg-gray-900 border-white text-white');
//         expect(screen.getByText('Personal Details').classList).toContain('text-black');
//         expect(screen.getByText('Additional Details').classList).toContain('text-red-800');
//       });
//     });
//   });
  
//   function renderWithContext(element) {
//     render(
//       <BrowserRouter>
//         <Provider store={store}>{element}</Provider>
//       </BrowserRouter>
//     );
//   }
  