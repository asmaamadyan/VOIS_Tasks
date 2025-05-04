import { createSlice } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";
const initialAuthState={isAuthenticated : false}
//   const auth = getAuth();
//   const user = auth.currentUser;
// const userId = user.uid

const authSlice = createSlice({
    name : 'auth',
    // user : userId,
    initialState : initialAuthState,
    reducers :{
        login(state){
            state.isAuthenticated =true
        },
        logout(state){
            state.isAuthenticated =false
        }
    }

})
export const authActions=authSlice.actions;
export default authSlice.reducer