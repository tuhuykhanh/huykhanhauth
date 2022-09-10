import { createSlice } from "@reduxjs/toolkit";


export const authSlice =  createSlice({
    name: 'auth',
    initialState:{
        user: [],
        isLogged: false,
        isAdmin: false,
    },
    reducers:{

        login: (state , action)=>{
            state.isLogged = action.payload
        },
        setinfouser: (state,action)=>{
           state.user = action.payload
        },
        setroleuser: (state,action)=>{
            state.isAdmin = action.payload
        }
    }
})