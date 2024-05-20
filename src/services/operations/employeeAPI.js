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
  export function EmployeeSearch(AccessToken,employeeName) {
    return async (dispatch) => {
        try {
          console.log(employeeName)
            const response = await apiConnector(
                "GET",
                `${EMPLOYEE_SEARCH_API}?name=${employeeName}`,
            );
            console.log(response);
            return response;
        } catch (error) {
            console.error("Error uploading employee image:", error);
        }
    }
}

  export function uploadEmployeeImage(employeeId,AccessToken, formData) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
        try {
            console.log(AccessToken)
            console.log(employeeId);
            console.log(formData);
            const response = await apiConnector(
                "POST",
                `https://ec2-16-16-249-120.eu-north-1.compute.amazonaws.com/api/v1/employee/${employeeId}/uploadImage`,formData,
                {
                  headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${AccessToken}`,
                  }
              }
            );
            console.log(response);
            toast.success(response?.data?.message)
        } catch (error) {
            console.error("Error uploading employee image:", error);
            toast.error("Error uploading Profile Image");
        }
        toast.dismiss(toastId)
    }
}

export function addEmployeePersonalDetails(employeeId,data,AccessToken) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
      try {
          console.log(employeeId);
          console.log(AccessToken);
          console.log(data)
          const response = await apiConnector(
               "POST",
              `https://ec2-16-16-249-120.eu-north-1.compute.amazonaws.com/api/v1/employee/${employeeId}`,
              data,
              {
                  headers: {
                      "Content-Type": "multipart/form-data",
                      Authorization: `Bearer ${AccessToken}`,
                  },
              }
          );
          console.log(response);
          toast.success(response?.data?.message)
      } catch (error) {
          console.error( error);
          toast.error("Error adding Personal Details");
      }
      toast.dismiss(toastId);
  }
}

export function addEmployeeEmergencyContactDetails(employeeId,data,AccessToken) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
      try {
          console.log(employeeId);
          console.log(AccessToken);
          console.log(data)
          const response = await apiConnector(
               "POST",
              `https://ec2-16-16-249-120.eu-north-1.compute.amazonaws.com/api/v1/emergencyContact/employee/${employeeId}`, data,
              {
                  headers: {
                      "Content-Type": "multipart/form-data",
                      Authorization: `Bearer ${AccessToken}`,
                  },
              }
          );
          console.log(response);
          toast.success(response?.data?.message)
      } catch (error) {
          console.error( error);
          toast.error("Error adding Emergency Contact Details");
      }
      toast.dismiss(toastId);
  }
}

export function addEmployeeAddressDetails(employeeId,data,AccessToken) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
      try {
          console.log(employeeId);
          console.log(AccessToken);
          console.log(data)
          const response = await apiConnector(
               "POST",
               `https://ec2-16-16-249-120.eu-north-1.compute.amazonaws.com/api/v1/${employeeId}/addNewAddress`, data,
              {
                  headers: {
                      "Content-Type": "multipart/form-data",
                      Authorization: `Bearer ${AccessToken}`,
                  },
              }
          );
          console.log(response);
          toast.success(response?.data?.message)
      } catch (error) {
          console.error( error);
          toast.error("Error adding Emergency Contact Details");
      }
      toast.dismiss(toastId);
  }
}
export function addEmployeeBankDetails(employeeId,data,AccessToken) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
      try {
          console.log(employeeId);
          console.log(AccessToken);
          console.log(data)
          const response = await apiConnector(
               "POST",
               `https://ec2-16-16-249-120.eu-north-1.compute.amazonaws.com/api/v1/account/${employeeId}/AddBankAccount`, data,
              {
                  headers: {
                      "Content-Type": "multipart/form-data",
                      Authorization: `Bearer ${AccessToken}`,
                  },
              }
          );
          console.log(response);
          toast.success(response?.data?.message)
      } catch (error) {
          console.error( error);
          toast.error("Error adding bank Account Details");
      }
      toast.dismiss(toastId);
  }
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