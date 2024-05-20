const BASE_URL = "http://ec2-16-16-249-120.eu-north-1.compute.amazonaws.com/api/v1"


//Auth ENDPOINTS
export const authEndpoints = {
    LOGIN_API : BASE_URL + "/user/login",
}

//Employee ENDPOINTS
export const employeeEndpoints = {
    ADD_EMPLOYEE_API : BASE_URL + "/user/saveUser",
    EMPLOYEE_LIST_API : BASE_URL + "/bulk"
}