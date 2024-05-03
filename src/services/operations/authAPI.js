import toast from "react-hot-toast";
import { setLoading, setToken} from "../../slices/authSlice.js"
import { apiConnector } from "../apiconnector.js"
import { authEndpoints } from "../apis.js";


const {
  LOGIN_API
}=authEndpoints;

export function login({ email, password, navigate }) {
    return async (dispatch) => {
      try {
        const response = await apiConnector("POST", LOGIN_API, {
            email, password
        })
        if (!response.data.token) {
          throw new Error("Token not found in response");
        }
  
        toast.success("Login Successful");
        dispatch(setToken(response.data.token));
        localStorage.setItem("AccessToken", JSON.stringify(response.data.token));
        navigate("/");
  
      } catch (err) {
        toast.error(err?.response?.data?.message)
        console.log(err);
      }
  
      dispatch(setLoading(false));
    };
  }
       

        
export function logout(navigate){
    return (dispatch) => {
        const toastId = toast.loading("Logging Out...")
        dispatch(setToken(null))
        localStorage.clear()
        toast.success("Logged Out")
        toast.dismiss(toastId)
        navigate("/")
    }
}