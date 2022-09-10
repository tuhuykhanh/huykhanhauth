import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  axios  from 'axios'

import { showErrMsg , showSuccessMsg } from '../../utils/notification/Notification'
import {isEmpty, isEmail, isLength}  from '../../utils/validator/validator'

import { authSlice } from './authSliceReducer'
import './auth.scss'

function Login() {

    const initValue = {
        email: '',
        password: '',
        err: '',
        success: '',
    }  
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const value =  useSelector( state => state.infoUser)

    const [user, setUser] = useState(initValue)

    const { email, password, err, success } = user

    const handleChangeInput = e => {

        const { name, value } = e.target

        setUser({ ...user,[name]:value,err: '',success: ''})
    }
    const handleSubmit = async e => {
        e.preventDefault()

        if(isEmpty(email) || isEmpty(password))
            return setUser({ ...user,err: 'please enter full field', success: ''})
        if(!isEmail(email))
            return setUser({ ...user,err: 'Invalid Email', success: ''})
        if(isLength(password))
            return setUser({ ...user,err: 'password length must be > 6 chars', success: ''})
        try {

            const res = await axios.post('/account/login',{email,password})
            setUser({ ...user,err: '', success: res.data.msg})
            localStorage.setItem('firstLogin',true)
            dispatch(authSlice.actions.login(true))
            navigate('/');

        } catch (error) {

            error.response.data.msg &&
            setUser({ ...user,err: error.response.data.msg, success: ''})
        }     
    }
    return (
        <section>
            <div className='container-auth'>
                <div className="container-login">
                    <div className="title">LOGIN</div>
                    {err && showErrMsg(err)}
                    {success && showSuccessMsg(success)}
                    <form 
                    className='form-auth'
                    onSubmit={handleSubmit}
                    >

                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                name='email'
                                type='text'
                                placeholder='enter email'
                                id='email'
                                value={email}
                                onChange={handleChangeInput}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">PassWord:</label>
                            <input
                                name='password'
                                type='password'
                                placeholder='enter password'
                                id='password'
                                value={password}
                                onChange={handleChangeInput}
                            />
                        </div>

                        <div className='form-group redirect'>

                        <Link className="link" to='/register'> register </Link>
                            <Link className='link' to='/forgot'>forgot password ?</Link>
                        </div>


                        <button className='button' type='submit'>log in</button>
                    </form>
                </div>
            </div>
        </section>
    )
}
export default Login