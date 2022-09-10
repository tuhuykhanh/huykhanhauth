import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification'
import { authSlice } from './authSliceReducer'
import { isEmpty, isEmail, isLength, isMatch, } from '../../utils/validator/validator'
import './auth.scss'

function Login() {

    const initValue = {
        username: '',
        email: '',
        password: '',
        confirm_pass: '',
        err: '',
        success: '',
    }
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const value =  useSelector( state => state.infoUser)

    const [user, setUser] = useState(initValue)

    const { username, email, password, confirm_pass, err, success } = user

    const handleChangeInput = e => {

        const { name, value } = e.target
        setUser({ ...user, [name]: value, err: '', success: '' })

    }
    const handleSubmit = async e => {
        e.preventDefault()
        if (isEmpty(username) || isEmpty(password))
            return setUser({ ...user, err: 'Please Fill All Field', success: '' })
        if (!isEmail(email))
            return setUser({ ...user, err: 'Invalid Email', success: '' })
        if (isLength(password))
            return setUser({ ...user, err: 'PassWord Must longer than 6 Chars', success: '' })
        if (isMatch(password, confirm_pass))
            return setUser({ ...user, err: 'PassWord confirm incorrect', success: '' })
        try {

            const res = await axios.post('/account/register', {
                username:username,
                email:email,
                password:password
            })

            setUser({ ...user, err: '', success: res.data.msg })
            
            

        } catch (error) {

            error.response.data.msg &&
                setUser({ ...user, err: error.response.data.msg, success: '' })
        }
    }
    return (
        <section>
            <div className='container-auth'>
                <div className="container-register">
                    <div className="title">REGISTER</div>
                    {err && showErrMsg(err)}
                    {success && showSuccessMsg(success)}
                    <form
                        className='form-auth'
                        onSubmit={handleSubmit}
                    >
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                name='username'
                                type='text'
                                placeholder='Enter your name'
                                id='name'
                                value={username}
                                onChange={handleChangeInput}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                name='email'
                                type='email'
                                placeholder='Enter your email'
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
                                placeholder='Enter your password'
                                id='password'
                                value={password}
                                onChange={handleChangeInput}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Confirm Pass: </label>
                            <input
                                name='confirm_pass'
                                type='password'
                                placeholder='Enter password confirm'
                                id='confirm_pass'
                                value={confirm_pass}
                                onChange={handleChangeInput}
                            />
                        </div>

                        <button className='button' type='submit'>register</button>
                    <Link className="router" to='/login'> login </Link>

                    </form>
                </div>
            </div>
        </section>
    )
}
export default Login