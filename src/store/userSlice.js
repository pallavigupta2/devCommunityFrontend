import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:null,
    reducers:{
        addLoggedInUserData:(state,action)=>{
            return action.payload
        },
        logoutUser:()=>{
            return null;
        }
    }
})

export const { addLoggedInUserData,logoutUser} = userSlice.actions
export default userSlice.reducer