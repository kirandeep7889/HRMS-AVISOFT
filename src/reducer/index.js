import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import employeeReducer from "../slices/employeeSlice";

const rootReducer=combineReducers({
     auth: authReducer,
     profile : profileReducer,
     employee:employeeReducer

})


export default rootReducer;