import { Routes, Route, } from "react-router-dom";
import Login from "./account/login";
import Register from "./account/register";
import ActivationEmail from './account/activationEmail';
import TestCpn from './test/index'
function Body() {

    return (

    <>
        <Routes>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account/activation/:activation_token" element={<ActivationEmail />} />
            <Route path='/test' element={<TestCpn />}   />

            
        </Routes>
    </>
    )

}

export default Body