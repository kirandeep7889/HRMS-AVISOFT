import toast from "react-hot-toast";
import { setLoading} from "../../slices/authSlice.js"
import { employeeEndpoints } from "../apis.js";
import { apiConnector } from "../apiconnector.js";
const {
  ADD_EMPLOYEE_API
  ,EMPLOYEE_LIST_API
}=employeeEndpoints;
import { addEmployees } from "../../slices/employeeSlice.js";

export function addEmployee(employeeData) {
    return async (dispatch) => {
      dispatch(setLoading(true));
      try {
        const {AccessToken,navigate}=employeeData;
        const response = await apiConnector("POST", ADD_EMPLOYEE_API, employeeData,`Bearer ${AccessToken}`);
        console.log(response)
        dispatch(addEmployees(response?.data?.employeeId)); 
        navigate("employee/employee-list")
        toast.success("Employee added successfully");
      } catch (error) {
        toast.error("Failed to add employee");
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