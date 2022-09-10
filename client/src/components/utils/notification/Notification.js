
import React from 'react'

export const showErrMsg = (msg) =>{
    return ( <div className="errMsg boxMsg">{msg}</div>)
}

export const showSuccessMsg = (msg) =>{
    return ( <div className="succMsg boxMsg">{msg}</div>)
}