import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../components/body/account/authSliceReducer' 
import { tokenSlice } from './reducers/pushTokenReducer'

const store = configureStore({
  reducer:{
      infoUser: authSlice.reducer,
      tokenAuth:  tokenSlice.reducer
  }
})

export default store