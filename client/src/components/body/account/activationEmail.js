
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification'

function ActivationEmail() {

    const { activation_token } = useParams()
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        
        if (activation_token) {
            const activeEmail = async e => {
                try {

                    const res = await axios.post('/account/activation', { activation_token })
                    setSuccess(res.data.msg)

                } catch (error) {
                    error.response.data.msg && setErr(error.response.data.msg)
                }
            }
            activeEmail()
        }
    }, [activation_token])

    return (

        <div className='form-active-email'>

            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

        </div>
    )
}

export default ActivationEmail