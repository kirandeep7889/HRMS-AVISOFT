import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    AccessToken : localStorage.getItem("AccessToken") ? JSON.parse(localStorage.getItem("AccessToken")) : null,
    loading : false,
};

const authSlice = createSlice({
    name : "auth",
    initialState : initialState,
    reducers : {
        setToken(state, value){
            state.token = value.payload
        },
        setLoading(state, value){
            state.loading = value.payload
        }
    },
});

export const { setToken, setLoading} = authSlice.actions;
export default authSlice.reducer;

