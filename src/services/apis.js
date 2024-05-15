const BASE_URL = "http://ec2-51-20-3-193.eu-north-1.compute.amazonaws.com/api/v1"


//Auth ENDPOINTS
export const authEndpoints = {
    LOGIN_API : BASE_URL + "/user/login",
}


//Employee ENDPOINTS
export const employeeEndpoints = {
    ADD_EMPLOYEE_API : BASE_URL + "/user/saveUser",
    EMPLOYEE_LIST_API : BASE_URL + "/bulk",
    UPLOAD_EMPLOYEE_IMAGE_API: BASE_URL + "/employee/:employeeId/uploadImage",
    ADD_EMPLOYEE_PERSONAL_DETAILS_API : BASE_URL + "/employeee/:employeeId",
    ADD_EMPLOYEE_EMERGENCY_CONTACT_API : BASE_URL +  "/emergencyContact/employee/:employeeId"
}