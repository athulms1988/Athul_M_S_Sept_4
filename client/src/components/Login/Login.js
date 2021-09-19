import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ValidationForm, TextInput } from "react-bootstrap4-form-validation";
import axios from 'axios';
import { toastr } from "react-redux-toastr";
const Login = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [apiTriggered, setApiTriggered] = useState(false);
    const doLogin = () => {
        setApiTriggered(true);
        const request = {
            email: userEmail,
            password: userPassword
        }
        axios.post('/user/login', request)
        .then((response)=>{
            setApiTriggered(false);
            if(response && response.data && response.data.token){
                localStorage.setItem('user', JSON.stringify(response.data));
                window.location.href = '/list';
            }
            else{
                toastr.error("Login", 'Unexpected error occured');
            }
        }).catch((error)=>{
            setApiTriggered(false);
            const errorMsg = error.response && error.response.data && error.response.data.message;
            toastr.error("Login", errorMsg);
        })
    }
    return (
        <>
            <ValidationForm onSubmit={(e) => { e.preventDefault(); doLogin();}} minLength="4" defaultErrorMessage={{type:"Invalid Email"}}>
                <div className="wrapper fadeInDown">
                    <div className="formContent">
                        <div className="fadeIn first">
                            <h5>Login User</h5>
                        </div>
                        <div className="form-group">
                            <TextInput type="email" name="email" className="fadeIn second" autoComplete="off" onChange={(e) => {setUserEmail(e.target.value)}} value={userEmail} placeholder="Email" required successMessage="Looks good!"
                            errorMessage="Invalid Email"/>
                            <TextInput type="password" name="password" className="fadeIn third" autoComplete="off" onChange={(e) => {setUserPassword(e.target.value)}} value={userPassword} placeholder="Password" minLength="4" required successMessage="Looks good!"
                            errorMessage="Password should be minimum 4 characters"/>
                            <input type="submit" className="fadeIn fourth" value="Login" disabled={apiTriggered}/>
                        </div>
                        <div id="formFooter">
                            <Link className="underlineHover" to="/register">Create an Account</Link>
                        </div>
                    </div>
                </div>
            </ValidationForm>
        </>
    )
};
export default Login;    