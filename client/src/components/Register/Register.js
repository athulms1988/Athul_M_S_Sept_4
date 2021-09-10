import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ValidationForm, TextInput } from "react-bootstrap4-form-validation";
import axios from 'axios';
import { toastr } from "react-redux-toastr";
const Register = () => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userConfirmPassword, setUserConfirmPassword] = useState('');
    const [apiTriggered, setApiTriggered] = useState(false);
    const history = useHistory();
    const doLogin = () => {
        setApiTriggered(true);
        const request = {
            name: userName,
            email: userEmail,
            password: userPassword
        }
        axios.post('/user/register', request)
        .then((response)=>{
            setApiTriggered(false);
            if(response && response.data && response.data.message){
                toastr.success("Register", response.data.message);
                history.push('/');
            }
            else{
                toastr.error("Register", 'Unexpected error occured');
            }
        }).catch((error)=>{
            setApiTriggered(false);
            const errorMsg = error.response && error.response.data && error.response.data.message;
            toastr.error("Register", errorMsg);
        })
    }

    const matchPassword = (value) => {
        return value && value === userPassword;   
    }
    return (
        <>
            <ValidationForm onSubmit={(e) => { e.preventDefault(); doLogin();}} minLength="4" defaultErrorMessage={{type:"Invalid Email"}}>
                <div className="wrapper fadeInDown">
                    <div className="formContent">
                        <div className="fadeIn first">
                            <h5>Login</h5>
                        </div>
                        <div className="form-group">
                            <TextInput type="text" name="username" className="fadeIn second" autoComplete="off" onChange={(e) => {setUserName(e.target.value)}} value={userName} placeholder="Name" required successMessage="Looks good!"
                                errorMessage="Name should be minimum 4 characters"/>
                            <TextInput type="email" name="email" className="fadeIn second" autoComplete="off" onChange={(e) => {setUserEmail(e.target.value)}} value={userEmail} placeholder="Email" required successMessage="Looks good!"
                                errorMessage="Invalid Email"/>
                            <TextInput type="password" name="password" className="fadeIn third" autoComplete="off" onChange={(e) => {setUserPassword(e.target.value)}} value={userPassword} placeholder="Password" minLength="4" required successMessage="Looks good!"
                                errorMessage="Password should be minimum 4 characters"/>
                            <TextInput type="password" name="confirmpassword" className="fadeIn third" autoComplete="off" onChange={(e) => {setUserConfirmPassword(e.target.value)}} value={userConfirmPassword} validator={matchPassword} placeholder="Confirm Password" minLength="4" required successMessage="Looks good!"
                                errorMessage={{validator: "Password does not match"}}/>
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
export default Register;    