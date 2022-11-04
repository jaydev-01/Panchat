import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";

export default function ResetPassword() {
    const navigate = useNavigate(null);
    const [reseted,setReseted] = useState(true);
    const [newPassword, setNewPassword] = useState({
        password : '',
        confirmPassword: ''
    });

    useEffect(() => {
        const id = localStorage.getItem('id');
        if(id === null){
            setReseted(false);
            navigate('/forget-password');
        }
      }, []); 

    const inputHandler = event => {
        let ResetPassword = {...newPassword};
        ResetPassword[event.target.name] = event.target.value;
        setNewPassword(ResetPassword);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if(validate()){
            if(reseted){
                let resetPassword = newPassword;
                let id = localStorage.getItem('id');
                const myurl = `${process.env.REACT_APP_URL}api/panchat/reset-password`;
                let bodyFormData = new URLSearchParams();
                bodyFormData.append('id',id);
                bodyFormData.append('password',resetPassword['password']);
                axios({
                    method : "post",
                    url : myurl,
                    data : bodyFormData,
                    headers :  { "Content-Type": "application/x-www-form-urlencoded" },
                })
                .then(res => {
                     if(res?.data?.success){
                        localStorage.removeItem('id');
                        toast.success(res.data.message);
                     }
                })
                .catch(error => {
                    console.log("error", error.response);
                    toast.error(error.response.data.message || "Something went Wrong..!");
                })
            }else{
                toast.error("You Already reset Password");
            }
        }else{
            console.log(false);
        }
        

    }

    const validate = () => {
        let input = newPassword;
        let isValid = true;

        if(!input['password']){
            isValid = false;
            toast.error("Please Enter New Password!");
        }

        if(!input['confirmPassword']){
            isValid = false;
            toast.error("Please Enter Confirm Password!");
        }else if(input['password'] !== input['confirmPassword']){
            isValid = false;
            toast.error("Confirm password must same as Password!");
        }

        return isValid;
    }

    return (
        <div className="form-of-login">
            <div className="center-form">
                <h6>Reset Password</h6>
                <form onSubmit={e => submitHandler(e)} className="login">
                    <div>
                        <input type="password" name='password' placeholder="Password" className="input" onChange={inputHandler} />
                        <span className="input-span"></span>
                    </div>
                    <div>
                        <input type="password" name='confirmPassword' placeholder="Confirm Password" className="input" onChange={inputHandler} />
                        <span className="input-span"></span>
                    </div>
                    <div>
                        <button value="reset" type='submit' className="btn">Reset</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
