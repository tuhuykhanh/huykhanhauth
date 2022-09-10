
import { createSlice } from "@reduxjs/toolkit"; 

export const tokenSlice = createSlice({
    name: 'token',
    initialState:'',
    reducers: {
        gettoken: (state ,action)=>{
           return action.payload
        }
    }
})