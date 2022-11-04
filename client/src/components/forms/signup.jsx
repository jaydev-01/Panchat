import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";


export default function Signup() {
    const navigate = useNavigate();
    const [signupInfo, setSignupInfo] = useState({
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
        mobileno: ""
    });

    const InputEvent = (e) => {
        const newLoginInfo = { ...signupInfo };
        newLoginInfo[e.target.name] = e.target.value;
        setSignupInfo(newLoginInfo);
    };


    const SubmitHandler = (e) => {
        e.preventDefault();
        // console.log(process.env.REACT_APP_URL);
        if (validate()) {
            const { email, name, password, mobileno } = signupInfo;
            const myurl = `${process.env.REACT_APP_URL}api/panchat/sign-up`;
            let bodyFormData = new URLSearchParams();
            bodyFormData.append("email",email);
            bodyFormData.append("password",password);
            bodyFormData.append("name",name);
            bodyFormData.append("mobileno",mobileno);
            axios({
                method : "post",
                url : myurl,
                data : bodyFormData,
                headers : { "Content-Type": "application/x-www-form-urlencoded" },
            })
            .then(res => {
                if(res?.data?.success){
                    console.log("signup");
                    localStorage.setItem("dm_user_token", res.data.data.token);
                    localStorage.setItem("userInfo", JSON.toString(res.data.data.user));
                    toast.success(res.data.message);
                    navigate(`/upload-profile`);
                }
            })
            .catch(error => {
                console.log("error", error.response);
                toast.error(error.response.data.message || "Something went Wrong..!");
            })
        } else {
            console.log(false);
        }
    }

    const validate = () => {
        let input = signupInfo;
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

        if (!input["name"]) {
            isValid = false;
            toast.error("Please enter Name");
        }

        if (!input["confirmPassword"]) {
            isValid = false;
            toast.error("Please enter Confirm Password");
        }else if(input["password"] != input["confirmPassword"]){
            isValid = false;
            toast.error("Confirm Password must same as Password!");
        }

        if (!input["mobileno"]) {
            isValid = false;
            toast.error("Please enter Mobile No");
        }else if(!(input["mobileno"].match( /^\d{10}$/))){
            isValid = false;
            toast.error("Invalid Mobile No");
        }

        return isValid;
    }
    return (
        <div className="form-of-login">
            <div className="center-form">
                <h6>Sign Up</h6>
                <form action="" className="login" onSubmit={(e) => SubmitHandler(e)}>
                    <div>
                        <input type="text" placeholder="Name" className="input" name='name' onChange={InputEvent} />
                    </div>
                    <div>
                        <input type="text" placeholder="Email" className="input" name='email' onChange={InputEvent} />
                    </div>
                    <div>
                        <input type="password" placeholder="Password" className="input" name='password' onChange={InputEvent} />
                    </div>
                    <div>
                        <input type="password" placeholder="Confirm Password" className="input" name='confirmPassword' onChange={InputEvent} />
                    </div>
                    <div>
                        <input type="text" placeholder="Mobile No" className="input" name='mobileno' onChange={InputEvent} />
                    </div>
                    <div>
                        <button type='submit' value="signup" className="btn">Sign Up</button>
                    </div>
                    <div className="new-ac-span">
                        Have Account?<span> <a href="/login">Log In</a></span>
                    </div>
                </form>
            </div>
            {/* <ToastContainer /> */}
        </div>

    )
}
