import toast from "react-hot-toast";
import { setLoading, setToken} from "../../slices/authSlice.js"
import { apiConnector } from "../apiconnector.js"
import { authEndpoints } from "../apis.js";
import { setUser } from "../../slices/profileSlice.js";


const {
  LOGIN_API
}=authEndpoints;

export function login({ email, password, navigate }) {
    return async (dispatch) => {
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", LOGIN_API, {
            email, password
        })
        console.log(response)
        if (!response.data.token) {
          throw new Error("Token not found in response");
        }
        toast.success("Login Successful");
        dispatch(setToken(response.data.token));
        const userImage = response.data.profileImage ? response.data.profileImage :  `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.firstName} ${response.data.lastName}`
        dispatch(setUser({...response.data,image:userImage}));
        localStorage.setItem("user", JSON.stringify({...response.data,image:userImage}))
        localStorage.setItem("AccessToken", JSON.stringify(response.data.token));
      } catch (err) {
        toast.error(err?.response?.data?.message)
        console.log(err);
      }
      dispatch(setLoading(false));
      navigate("/");  
    };
  }
       

        
export function logout(navigate){
    return (dispatch) => {
        const toastId = toast.loading("Logging Out...")
        dispatch(setToken(null))
        localStorage.clear()
        toast.success("Logged Out")
        toast.dismiss(toastId)
        navigate("/login")
    }
}