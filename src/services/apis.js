const BASE_URL = "http://ec2-16-16-249-120.eu-north-1.compute.amazonaws.com/api/v1"


//Auth ENDPOINTS
export const authEndpoints = {
    LOGIN_API : BASE_URL + "/user/login",
}

//Employee ENDPOINTS
export const employeeEndpoints = {
    ADD_EMPLOYEE_API : BASE_URL + "/user/saveUser",
    EMPLOYEE_LIST_API : BASE_URL + "/employee/getAllEmployees",
    UPLOAD_EMPLOYEE_IMAGE_API: BASE_URL + "/employee/:employeeId/uploadImage",
    ADD_EMPLOYEE_PERSONAL_DETAILS_API : BASE_URL + "/employee",
    ADD_EMPLOYEE_EMERGENCY_CONTACT_API : (employeeId) => BASE_URL +  `/emergencyContact/employee/${employeeId}`,
    EMPLOYEE_SEARCH_API: BASE_URL + "/employee/searchEmployee"
}


//Department Endpoints
export const DepartmentEndpoints={
    DEPARTMENT_LIST_API : BASE_URL + "/department",
    ADD_DEPARTMENT_API : BASE_URL + "/department",
    UPDATE_DEPARTMENT_API :BASE_URL + "/department",
    DELETE_DEPARTMENT_API : BASE_URL + "/department"
}