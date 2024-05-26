
# HRMS-AVISOFT

The HRMS Frontend is a web application designed to manage human resources efficiently. It interacts with the backend services to provide a seamless experience for users.

## Run Locally

Clone the project

```bash
  git clone https://github.com/kirandeep7889/HRMS-AVISOFT.git
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev 
```
The application will be available at http://localhost:5173.




## Contributors

1.Kirandeep Singh

2.Deep Singh Yadav
## Branches Information:

1. main: The stable version of the project.

2. dev-frontend: The main development branch containing all the feature branches.


## Feature Branches:
```
1. Login-page
2. Add-Employee
```

## 1. LOGIN-PAGE
The login-page branch provides the login 
functionality for different user roles (superadmin, admin, 
and employee). Users can select their role from a dropdown
and log in with their respective accounts.


                        UNIT TESTING STRATEGY:
 The unit tests for the login-page are designed to ensure the LoginFormTemplate component works correctly. Key points include:

1. Setup and Teardown: Mocking store.dispatch and authAPI.login to prevent actual API calls and state changes.
Rendering Components: Using renderWithContext to wrap the component with necessary providers.
Assertions: Checking the presence of elements, their text content, and attributes.
Form Submission: Simulating user input and verifying the correct function calls with expected parameters.

2. Rendering Components: The renderWithContext function wraps the component with Provider and BrowserRouter to provide the necessary context for the component during testing.

3.Assertions:We use various assertions to check if elements are present in the document and if they have the correct attributes or text content.
We test the behavior of the component by simulating user interactions and verifying that the correct actions are dispatched.


## 2. Add-Employee-Page

The add-employee-page branch provides the functionality to add a new employee in a multi-step process. This branch is divided into three main steps to ensure all necessary information is captured efficiently.

                    Step 1: Primary Information
This step captures the employee's primary information, including email, password, and role.
Database Entry: The initial entry for the user is created in the database based on this information.
Unit Testing Strategy for Step 1
The unit tests for the PrimaryEmployeeDetails component are designed to verify that the form fields are rendered correctly and function as expected. Key aspects of the testing strategy include:

Rendering Form Fields: Ensuring all form fields are present and have the correct placeholders and labels.

Submit Button: Checking that the submit button is rendered with the correct text.
Test IDs: Verifying that elements have the correct test IDs for easier selection during testing.
Example tests include:

Form Fields Placeholders: Check that the email and password input fields have the correct placeholders.
Form Field Labels: Verify that the labels for email, password, and role are rendered with the correct text.
Submit Button Text: Ensure that the submit button is present and has the text "Submit".
Form Fields Presence: Confirm that all form fields (email, password, role select, and submit button) are rendered in the document.

                     Step 2: Personal Information
The add-employee-page branch's second step is focused on gathering personal information about the employee. The EmployeePersonalInfo component is responsible for collecting details such as first name, last name, department, position, and other personal identifiers like PAN, Aadhar, and UAN numbers. 

The unit tests for the EmployeePersonalInfo component ensure that all form fields are correctly rendered with appropriate placeholders, labels, and select options. The testing strategy includes:

Rendering Form Fields: Verifying that each input field is present and has the correct placeholder text.
Field Labels: Ensuring that labels for each form field are rendered with the correct text.
Select Options: Checking that select options (e.g., department, position, gender) are rendered and contain the expected values.
Buttons: Ensuring that the submit and navigation buttons (e.g., "Add" and "Next Step") are present with the correct text.

                       Step 3: Additional Details
The third step in the add-employee-page branch is focused on capturing additional details about the employee, including emergency contact information, address details, and bank account details. The EmployeeAdditionalDetails component manages these inputs. Here's a brief explanation of the unit testing strategy for this step:
Unit Testing Strategy
The unit tests for the EmployeeAdditionalDetails component ensure that all form fields are correctly rendered with appropriate placeholders, labels, and that form submission works as expected. The testing strategy includes:

Rendering Form Fields: Verifying that each input field is present and has the correct placeholder text.

Field Labels: Ensuring that labels for each form field are rendered with the correct text.

Form Submission: Testing that the form handles submissions correctly, including interaction with mocked API calls.

Conditional Rendering: Checking that form fields are pre-filled with existing data when in edit mode.                       



