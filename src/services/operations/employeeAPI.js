import toast from "react-hot-toast";
import { setLoading} from "../../slices/authSlice.js"
import { employeeEndpoints } from "../apis.js";
import { apiConnector } from "../apiconnector.js";
const {
  ADD_EMPLOYEE_API
  ,EMPLOYEE_LIST_API,
  UPLOAD_EMPLOYEE_IMAGE_API,
  ADD_EMPLOYEE_PERSONAL_DETAILS_API,
  ADD_EMPLOYEE_EMERGENCY_CONTACT_API,
  EMPLOYEE_SEARCH_API
}=employeeEndpoints;
import { addEmployees, setStep } from "../../slices/employeeSlice.js";
import axios from "axios";

export function addEmployee(employeeData) {
    return async (dispatch) => {
      dispatch(setLoading(true));
      try {
        console.log(employeeData)
        const {AccessToken,navigate}=employeeData;
        const response = await apiConnector("POST", ADD_EMPLOYEE_API, employeeData,`Bearer ${AccessToken}`);
        console.log(response)
        dispatch(addEmployees(response?.data?.employeeId)); 
        toast.success(response?.data?.message);
        dispatch(setStep(2))
      } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message);
        console.error("Error adding employee:", error);
      }
      dispatch(setLoading(false));
    };
  }

  export function EmployeesList() {
    return async(dispatch) => {
      try{
      dispatch(setLoading(true));
      const response = await apiConnector("GET", EMPLOYEE_LIST_API,`Bearer ${AccessToken}`);
      return response; 
      }catch (err) {
        console.log(err)
      }  
    }
  }