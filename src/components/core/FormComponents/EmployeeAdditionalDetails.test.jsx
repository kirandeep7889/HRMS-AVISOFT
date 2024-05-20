import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useDispatch, useSelector } from 'react-redux';
import EmployeeAdditionalDetails from './EmployeeAdditionalDetails';

const mockStore = configureStore([]);

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

jest.mock('../../../services/operations/employeeAPI', () => ({
    addEmployeeAddressDetails: jest.fn(),
    addEmployeeBankDetails: jest.fn(),
    addEmployeeEmergencyContactDetails: jest.fn(),
}));

describe('EmployeeAdditionalDetails', () => {
    let store;
    let mockDispatch;

    beforeEach(() => {
        store = mockStore({
            auth: { AccessToken: 'dummyToken', loading: false },
            employee: { employees: ['employeeId1'] },
        });

        mockDispatch = jest.fn();
        useDispatch.mockReturnValue(mockDispatch);
        useSelector.mockImplementation(callback => {
            return callback(store.getState());
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders Emergency Contact Details form with placeholders and input fields', () => {
        render(
            <Provider store={store}>
                <EmployeeAdditionalDetails />
            </Provider>
        );

        expect(screen.getByPlaceholderText('Enter Contact Number')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter Relationship Detail..')).toBeInTheDocument();
    });

    test('renders Employee Address Details form with placeholders and input fields', () => {
        render(
            <Provider store={store}>
                <EmployeeAdditionalDetails />
            </Provider>
        );

        expect(screen.getByPlaceholderText('Enter Property Number')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter City')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter Zip Code')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter State')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter Country')).toBeInTheDocument();
    });

    test('renders Employee Bank Details form with placeholders and input fields', () => {
        render(
            <Provider store={store}>
                <EmployeeAdditionalDetails />
            </Provider>
        );

        expect(screen.getByPlaceholderText('Enter Account Number')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter IFSC Code')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter Branch')).toBeInTheDocument();
    });

    test('submits Emergency Contact Details form', async () => {
        const { addEmployeeEmergencyContactDetails } = require('../../../services/operations/employeeAPI');

        render(
            <Provider store={store}>
                <EmployeeAdditionalDetails />
            </Provider>
        );

        fireEvent.change(screen.getByPlaceholderText('Enter Contact Number'), { target: { value: '1234567890' } });
        fireEvent.change(screen.getByPlaceholderText('Enter Relationship Detail..'), { target: { value: 'Brother' } });

        const emergencyForm = screen.getByTestId('additional-details-form');
        fireEvent.click(within(emergencyForm).getByText('Add'));

        await waitFor(() => {
            expect(addEmployeeEmergencyContactDetails).toHaveBeenCalledWith(
                'employeeId1',
                { contact: '1234567890', relationship: 'Brother' },
                'dummyToken'
            );
        });
    });

    test('submits Employee Address Details form', async () => {
        const { addEmployeeAddressDetails } = require('../../../services/operations/employeeAPI');

        render(
            <Provider store={store}>
                <EmployeeAdditionalDetails />
            </Provider>
        );

        fireEvent.change(screen.getByPlaceholderText('Enter Property Number'), { target: { value: '101' } });
        fireEvent.change(screen.getByPlaceholderText('Enter City'), { target: { value: 'New York' } });
        fireEvent.change(screen.getByPlaceholderText('Enter Zip Code'), { target: { value: '10001' } });
        fireEvent.change(screen.getByPlaceholderText('Enter State'), { target: { value: 'NY' } });
        fireEvent.change(screen.getByPlaceholderText('Enter Country'), { target: { value: 'USA' } });
        fireEvent.change(screen.getByLabelText('Address Type*'), { target: { value: 'PERMANENT' } });

        const addressForm = screen.getByTestId('address-details-form');
        fireEvent.click(within(addressForm).getByText('Add'));

        await waitFor(() => {
            expect(addEmployeeAddressDetails).toHaveBeenCalledWith(
                'employeeId1',
                {
                    addressType: 'PERMANENT',
                    propertyNumber: '101',
                    city: 'New York',
                    zipCode: '10001',
                    state: 'NY',
                    country: 'USA',
                },
                'dummyToken'
            );
        });
    });

    test('submits Employee Bank Details form', async () => {
        const { addEmployeeBankDetails } = require('../../../services/operations/employeeAPI');

        render(
            <Provider store={store}>
                <EmployeeAdditionalDetails />
            </Provider>
        );

        fireEvent.change(screen.getByPlaceholderText('Enter Account Number'), { target: { value: '9876543210' } });
        fireEvent.change(screen.getByPlaceholderText('Enter IFSC Code'), { target: { value: 'SBIN0001234' } });
        fireEvent.change(screen.getByPlaceholderText('Enter Branch'), { target: { value: 'Main Branch' } });
        fireEvent.change(screen.getByLabelText('Bank Name*'), { target: { value: 'State Bank of India' } });

        const bankForm = screen.getByTestId('bank-details-form');
        fireEvent.click(within(bankForm).getByText('Add'));

        await waitFor(() => {
            expect(addEmployeeBankDetails).toHaveBeenCalledWith(
                'employeeId1',
                {
                    bankName: 'State Bank of India',
                    accountNumber: '9876543210',
                    ifsc: 'SBIN0001234',
                    branch: 'Main Branch',
                },
                'dummyToken'
            );
        });
    });

    test('navigates to previous step when "Previous Step" button is clicked', () => {
        render(
            <Provider store={store}>
                <EmployeeAdditionalDetails />
            </Provider>
        );

        fireEvent.click(screen.getByText('Previous Step'));

        expect(mockDispatch).toHaveBeenCalledWith({ type: 'employee/setStep', payload: 2 });
    });
});
