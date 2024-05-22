import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import employeeReducer from "../slices/employeeSlice";
import departmentReducer from "../slices/departmentSlice"
import editingReducer from "../slices/editingSlice";

const rootReducer=combineReducers({
     auth: authReducer,
     profile : profileReducer,
     employee:employeeReducer,
     department:departmentReducer,
     editing:editingReducer
})


export default rootReducer;