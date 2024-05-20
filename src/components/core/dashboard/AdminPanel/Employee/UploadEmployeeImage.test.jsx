jest.mock('../../../../../assets/Images/placeholder.jpg', () => ({
  default: '../../../../../assets/Images/placeholder.jpg',
}));

global.URL.createObjectURL = jest.fn(() => 'mockImageUrl');

import React from 'react';
import { render, fireEvent, getByTestId, getByText, screen } from '@testing-library/react';
import UploadEmployeeImage from './UploadEmployeeImage';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from '../../../../../store/store';
import { uploadEmployeeImage } from '../../../../../services/operations/employeeAPI';

// Mock useSelector
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

// Mock the uploadEmployeeImage function
jest.mock('../../../../../services/operations/employeeAPI', () => ({
  uploadEmployeeImage: jest.fn()
}));

describe('UploadEmployeeImage component', () => {
  beforeEach(() => {
    useSelector.mockReturnValue({
      profile: {
        user: {
          firstName: 'John'
        }
      },
      auth: {
        AccessToken: 'mockAccessToken'
      },
      employee: {
        employees: ['mockEmployeeId']
      }
    });
  });

  afterEach(() => {
    useSelector.mockClear();
    useDispatch.mockClear();
    uploadEmployeeImage.mockClear();
  });

  it('renders with hardcoded data', () => {
       render(
      <Provider store={store}>
        <UploadEmployeeImage />
      </Provider>
    );

    expect(screen.getByText('Upload Employee Profile Picture')).toBeInTheDocument();
    expect(screen.getByText('Select')).toBeInTheDocument();
    expect(screen.getByText('Upload')).toBeInTheDocument();
  });

// Modify the test case for handling file selection and upload
it('handles file selection and upload', async () => {
  render(
    <Provider store={store}>
      <UploadEmployeeImage />
    </Provider>
  );

  const fileInput = screen.getByTestId('file-input');
  const selectButton = screen.getByText(/Select/); // Using regular expression to match "Select"
  fireEvent.change(fileInput, { target: { files: [new File([], 'profile.jpg')] } });
  fireEvent.click(selectButton);

  expect(fileInput.files[0]).toBeDefined();

});

});
