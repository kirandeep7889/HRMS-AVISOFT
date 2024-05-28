const BASE_URL = "http://localhost:5555/api/v1"


//Auth ENDPOINTS
export const authEndpoints = {
    LOGIN_API : BASE_URL + "/user/login",
}

//Employee ENDPOINTS
export const employeeEndpoints = {
    ADD_EMPLOYEE_API : BASE_URL + "/user/saveUser",
    EMPLOYEE_LIST_API : BASE_URL + "/employee/getAllEmployees",
    UPLOAD_EMPLOYEE_IMAGE_API: (employeeId)=> BASE_URL + `/employee/${employeeId}/uploadImage`,
    ADD_EMPLOYEE_PERSONAL_DETAILS_API :(employeeId)=> BASE_URL + `/employee/${employeeId}`,
    UPDATE_EMPLOYEE_PERSONAL_DETAILS_API: (employeeId) => BASE_URL + `/employee/updateEmployeeDetails/${employeeId}`,
    ADD_EMPLOYEE_EMERGENCY_CONTACT_API : (employeeId) => BASE_URL +  `/emergencyContact/employee/${employeeId}`,
    EDIT_EMPLOYEE_EMERGENCY_CONTACT_API : (contactId) => BASE_URL +  `/emergencyContact/${contactId}`,
    ADD_EMPLOYEE_ADDRESS_DETAILS_API:(employeeId) =>BASE_URL + `/address/${employeeId}/addNewAddress`,
    EDIT_EMPLOYEE_ADDRESS_DETAILS_API:(employeeId,addressId) =>BASE_URL + `/address/${employeeId}/editAddress/${addressId}`,
    ADD_EMPLOYEE_BANK_DETAILS_API: (employeeId) => BASE_URL + `/account/${employeeId}/AddBankAccount`,
    EDIT_EMPLOYEE_BANK_DETAILS_API: (employeeId) => BASE_URL + `/account/${employeeId}/EditBankAccount`,
    EMPLOYEE_SEARCH_API: (employeeName)=>BASE_URL + `/employee/searchEmployee?name=${employeeName}`
}


//Department Endpoints
export const DepartmentEndpoints={
    DEPARTMENT_LIST_API : BASE_URL + "/department",
    ADD_DEPARTMENT_API : BASE_URL + "/department",
    UPDATE_DEPARTMENT_API : (departmentId)=>BASE_URL + `/department/${departmentId}`,
    DELETE_DEPARTMENT_API :(departmentId)=> BASE_URL + `/department/${departmentId}`
}