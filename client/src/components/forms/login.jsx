import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";

export default function Login() {
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState({
        email : "",
        password : ""
    });

    const inputEvent = e => {
        const newLoginInfo = {...loginInfo};
        newLoginInfo[e.target.name] = e.target.value;
        setLoginInfo(newLoginInfo);
    }

    const submitHandler = e => {
        e.preventDefault();

        if(validate()){
           const {email, password } = loginInfo;
           let myurl = `${process.env.REACT_APP_URL}api/panchat/login`;
           let bodyFormData = new URLSearchParams();
           bodyFormData.append("email", email);
           bodyFormData.append("password", password);

           axios({
            method : "post",
            url : myurl,
            data : bodyFormData,
            headers : { "Content-Type": "application/x-www-form-urlencoded" },
           })
           .then(res=>{
            if(res?.data?.success){
                console.log("login");
                localStorage.setItem("dm_user_token", res.data.data.token);
                localStorage.setItem("profilePic", res.data.data.checkUser.pic);
                localStorage.setItem("userInfo", JSON.toString(res.data.data.checkUser));
                toast.success(res.data.message);
                navigate(`/`);
            }
           })
           .catch(error => {
            console.log("error", error.response);
            toast.error(error.response.data.message || "Something went Wrong..!");
           })
        }else{
            console.log(false);
        }
    }

    const validate = () => {
        let input = loginInfo;

        let isValid = true;

        if (!input["email"]) {
            isValid = false;
            toast.error("Please enter email");
        }else if(!(input["email"].match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))){
            isValid = false;
            toast.error("Invalid Email Address");
        }

        if (!input["password"]) {
            isValid = false;
            toast.error("Please enter Password");
        }

        return isValid;
    }

    return (
        <div className="form-of-login">
            <div className="center-form">
                <h6>Login</h6>
                <form className="login" onSubmit={(e) => submitHandler(e)}>
                    <div>
                        <input type="text" placeholder="Email" name='email' className="input" onChange={inputEvent} />
                    </div>
                    <div>
                        <input type="password" placeholder="Password" name='password' className="input" onChange={inputEvent} />
                    </div>
                    <div className="login-span">
                        <span><a href="forget-password">forget password?</a> </span>
                    </div>
                    <div>
                        <button value="login" className="btn" type='submit'>Login</button>
                    </div>
                    <div  className="new-ac-span">
                        Don't have account?<span> <a href="/sign-up"> Create Account</a></span>
                    </div>
                </form>
            </div>
        </div>
    )
}
