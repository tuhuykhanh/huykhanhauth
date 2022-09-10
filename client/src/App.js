import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Header from "./components/header/Header";
import Body from './components/body/Body'
import { tokenSlice } from './redux/reducers/pushTokenReducer'
import { authSlice } from './components/body/account/authSliceReducer'
import detectZoom from 'detect-zoom';

import axios from "axios";


function App() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.tokenAuth)
  const auth = useSelector(state => state.infoUser)

  const fetchuser = async (token) => {
    const res = await axios.get('/account/info', {
      headers: { Authorization: token }
    })
    return res
  }
  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if (firstLogin) {
      const gettoken = async () => {
        const res = await axios.post('/account/refresh_token', null)
        dispatch(tokenSlice.actions.gettoken(res.data.access_token))
      }
      gettoken()
    }
  }, [auth.isLogged, dispatch])
  useEffect(() => {
    if (token) {
      const getUserlogged = () => {
        dispatch(authSlice.actions.login(true))
        return fetchuser(token).then(res => {
          const isAdmin = res.data.role === 'admin' ? true : false
          dispatch(authSlice.actions.setinfouser(res.data))
          dispatch(authSlice.actions.setroleuser(isAdmin))
        })
      }
      getUserlogged()
    }
  }, [token, dispatch])



  return (
    <div className="App">

      <Header />
      <Body />





    </div>
  );
}

export default App;
