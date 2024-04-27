import toast from "react-hot-toast";
import { setLoading} from "../../slices/authSlice.js"
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

            navigate("/admin/dashboard");


        } catch (err) {
                   toast.error(err)
                }  
            dispatch(setLoading(false))
            }
        }       