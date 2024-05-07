import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import EmployeeList from './EmployeeList';
import ExportDataJSON from '../../../../../utils/ExportFromJson';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

jest.mock('../../../../../utils/ExportFromJson', () => jest.fn());

describe('EmployeeList component', () => {
  beforeEach(() => {
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValue([]);
  });

  test('displays employee table with correct data', () => {
    const employees = [
      {
        avatar: 'mock_avatar_url',
        name: 'kirandeep singh',
        email: 'kirandeep@gmail.com',
        empId: '1',
        role: 'Employee',
        address: 'Jammu'
      }
    ];

    renderWithContext(
      <EmployeeList employees={employees} />
    );

    // Assert table headers
    expect(screen.getByTestId('avatar-header')).toBeInTheDocument();
    expect(screen.getByTestId('name-header')).toBeInTheDocument();
    expect(screen.getByTestId('email-header')).toBeInTheDocument();
    expect(screen.getByTestId('address-header')).toBeInTheDocument();
    expect(screen.getByTestId('role-header')).toBeInTheDocument();
    expect(screen.getByTestId('action-header')).toBeInTheDocument();

    // Assert employee data
    expect(screen.getByText('kirandeep singh')).toBeInTheDocument();
    expect(screen.getByText('kirandeep@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('Jammu')).toBeInTheDocument();
    expect(screen.getByText('Employee')).toBeInTheDocument();
  });


  test('calls ExportDataJSON with correct arguments for excel export', () => {
    const employees = [
      {
        avatar: 'mock_avatar_url',
        name: 'kirandeep singh',
        email: 'kirandeep@gmail.com',
        empId: '1',
        role: 'Employee',
        address: 'Jammu'
      }
    ];

    renderWithContext(
      <EmployeeList employees={employees} />
    );

    const exportExcelButton = screen.getByTestId('export-excel-button');
    fireEvent.click(exportExcelButton);

    expect(ExportDataJSON).toHaveBeenCalledWith(employees, 'Employee', 'xls');
  });

  test('calls ExportDataJSON with correct arguments for csv export', () => {
    const employees = [
      {
        avatar: 'mock_avatar_url',
        name: 'kirandeep singh',
        email: 'kirandeep@gmail.com',
        empId: '1',
        role: 'Employee',
        address: 'Jammu'
      }
    ];

    renderWithContext(
      <EmployeeList employees={employees} />
    );

    const exportCsvButton = screen.getByTestId('export-csv-button');
    fireEvent.click(exportCsvButton);

    expect(ExportDataJSON).toHaveBeenCalledWith(employees, 'Employee', 'csv');
  });
});

function renderWithContext(element) {
  render(
    <BrowserRouter>
      {element}
    </BrowserRouter>
  );
}
