import toast from "react-hot-toast";
import { setLoading, setToken} from "../../slices/authSlice.js"
import { apiConnector } from "../apiconnector.js"
import { authEndpoints } from "../apis.js";


const {
  LOGIN_API
}=authEndpoints;

export function login({email, password, navigate}){
    return async(dispatch) => {
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST", LOGIN_API, {
                email, password
            })
            console.log("LOGIN API RESPONSE...........", response)

            if(!response.data.success) throw new Error(response.data.message);

            toast.success("Login Successfull")
            dispatch(setToken(response.data.token))
            localStorage.setItem("token", JSON.stringify(response.data.token));
            navigate("/");

        } catch (err) {
                   toast.error(err)
                }  
            dispatch(setLoading(false))
            }
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