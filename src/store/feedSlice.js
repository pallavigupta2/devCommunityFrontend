import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeed:(state,action)=>{
            return action.payload
        },
        removeFeed:(state,action)=>{
            const updatedFeed = state.filter((item)=>action.payload !== item._id);
            return updatedFeed
        }
    }
})

export const {addFeed,removeFeed} = feedSlice.actions
export default feedSlice.reducer;