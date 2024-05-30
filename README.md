
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

## PROJECT STRUCTURE : 

A brief overview of the project structure:-


![image](https://github.com/kirandeep7889/HRMS-AVISOFT/assets/124796483/1b38c016-9311-400c-93cd-927d241f0f39)


## Branches Information:

1. main: The stable version of the project.

2. dev-frontend: The main development branch containing all the feature branches.


## Feature Branches:
1. Login-page
2. Add-Employee

## 1. LOGIN-PAGE


The login-page branch provides the login 
functionality for different user roles (superadmin, admin, 
and employee). Users can select their role from a dropdown
and log in with their respective accounts.

![Screenshot (49)](https://github.com/kirandeep7889/HRMS-AVISOFT/assets/124796483/6d1a069a-d805-4a99-8fd8-e37affbc8d78)



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

 Step 1: Primary Information:-

This step captures the employee's primary information, including email, password, and role.
Database Entry: The initial entry for the user is created in the database based on this information.

![Screenshot (50)](https://github.com/kirandeep7889/HRMS-AVISOFT/assets/124796483/9b34a3d9-5194-4e02-8f52-553469bc9dfa)

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

Step 2: Personal Information:-

The add-employee-page branch's second step is focused on gathering personal information about the employee. The EmployeePersonalInfo component is responsible for collecting details such as first name, last name, department, position, and other personal identifiers like PAN, Aadhar, and UAN numbers. 
![Screenshot (51)](https://github.com/kirandeep7889/HRMS-AVISOFT/assets/124796483/6098fcdb-67bc-4c05-88e0-7bbe2249f5b3)


The unit tests for the EmployeePersonalInfo component ensure that all form fields are correctly rendered with appropriate placeholders, labels, and select options. The testing strategy includes:

Rendering Form Fields: Verifying that each input field is present and has the correct placeholder text.
Field Labels: Ensuring that labels for each form field are rendered with the correct text.
Select Options: Checking that select options (e.g., department, position, gender) are rendered and contain the expected values.
Buttons: Ensuring that the submit and navigation buttons (e.g., "Add" and "Next Step") are present with the correct text.

 Step 3: Additional Details:-
 
The third step in the add-employee-page branch is focused on capturing additional details about the employee, including emergency contact information, address details, and bank account details. The EmployeeAdditionalDetails component manages these inputs. 
![Screenshot (52)](https://github.com/kirandeep7889/HRMS-AVISOFT/assets/124796483/62852119-a41e-4c09-bd85-973f98a8409d)

Here's a brief explanation of the unit testing strategy for this step:
Unit Testing Strategy
The unit tests for the EmployeeAdditionalDetails component ensure that all form fields are correctly rendered with appropriate placeholders, labels, and that form submission works as expected. The testing strategy includes:

Rendering Form Fields: Verifying that each input field is present and has the correct placeholder text.

Field Labels: Ensuring that labels for each form field are rendered with the correct text.

Form Submission: Testing that the form handles submissions correctly, including interaction with mocked API calls.

Conditional Rendering: Checking that form fields are pre-filled with existing data when in edit mode.                  



## 3. Navbar

![Screenshot (55)](https://github.com/kirandeep7889/HRMS-AVISOFT/assets/124796483/2c242200-7285-48bc-8f6d-8fa771078ab6)

Features:-

1. Logo Display: The company logo is displayed and linked to the homepage.

2. Search Bar: Allows users to search for employee information by name.
Uses react-hook-form for form handling.
Upon submitting a valid search query, it navigates to the employee info page.

3. Authentication Check: Displays different options based on user authentication status.
If the user is not authenticated, a "Log In" button is shown.
If the user is authenticated, a profile dropdown is displayed.

Unit Testing Strategy:-

Unit testing ensures that each part of the NavBar component works as expected. The tests cover rendering elements, form functionality, and conditional rendering based on authentication status.

Test Cases:-
Rendering Logo: Ensures the company logo is rendered correctly.
Rendering Search Input and Button: Checks if the search input field and button are present.
Rendering Log In Button: Verifies the Log In button appears when the user is not authenticated.
Rendering ProfileDropDown: Ensures the profile dropdown is shown when the user is authenticated.


## 4.searchbar

The employee search functionality allows users to quickly find and view employee details by entering the employee's name into a search bar located in the navigation bar. This feature streamlines access to employee information and enhances the user experience.

How It Works
Locate the Search Bar: The search bar is prominently placed in the navigation bar at the top of the application interface.
Enter Employee Name: Users can type the name of the employee they wish to find into the search bar.


Initiate Search: By clicking the "Search" button, the application processes the query.


Display Employee Details: If a matching employee is found, their details are displayed on a new page. This includes personal information (name, email, contact number, date of birth, gender) and additional details (department, position, employee code, join date).


Example Usage-

Search Bar in Navigation Bar:

![Screenshot (53)](https://github.com/kirandeep7889/HRMS-AVISOFT/assets/124796483/b60255e3-8b81-4598-bba3-6cd6c88f5ca8)

Employee Info Page:

 ![Screenshot (54)](https://github.com/kirandeep7889/HRMS-AVISOFT/assets/124796483/f85cbc55-5ec6-4948-a4ba-7e45a147fe5e)


UNIT TESTING STRATEGY:-

SEARCHBAR:

The tests focus on verifying the presence and functionality of the search input and search button.

Key Components of the Testing Strategy:-

Setup Testing Environment: Create a mock store to simulate the application's state and provide necessary context for the component.

Render Component: Use a custom render function to render the NavBar component within the test environment.

Select Elements: Use queries to select the search input field and the search button.

Assertions: Verify that the search input and button are rendered and present in the document.


## 5. Sidebar

The Sidebar component is a navigational element that provides easy access to various sections of the application. It dynamically generates its content based on a predefined set of menu items based on the login user's role .

![image](https://github.com/kirandeep7889/HRMS-AVISOFT/assets/124796483/94820880-3b57-4088-869d-0238258991ae)


Features:-

Fixed Position: The sidebar is fixed on the left side of the screen, ensuring it is always visible during navigation.

Dynamic Menu Items: The sidebar dynamically renders menu items and their sub-items based on the data imported from MenuItems.

Collapsible Sub-Menus: It supports collapsible sub-menus for better organization and navigation.


The SidebarLink component is responsible for rendering individual links and their sub-links within the sidebar. It supports expanding and collapsing sub-menus.

Features:-

Icon Display: Each menu item is accompanied by an icon.

Active Route Highlighting: The current active route is highlighted.

Expandable Sub-Menus: Menu items with children can be expanded or collapsed.


Unit Testing Strategy:-

Unit testing for the Sidebar and SidebarLink components ensures that they render correctly and behave as expected under different conditions.

Test Cases-

Rendering Menu Items: Ensure all menu items are rendered.
Rendering Sub-Menu Items: Verify that sub-menu items are rendered and can be toggled.

Active Route Highlighting: Check that the current route is highlighted correctly.


