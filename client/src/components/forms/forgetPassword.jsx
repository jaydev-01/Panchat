import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";

export default function ForgetPassword() {
    const [email,setEmail] = useState('');

    const inputHandler = event => {
        setEmail(event.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        let Email = email;
        if(Email !== ''){
            const myurl = `${process.env.REACT_APP_URL}api/panchat/send-email`;
            const bodyFormData = new URLSearchParams();
            bodyFormData.append('email',Email);
            axios({
                method : "post",
                url : myurl,
                data : bodyFormData,
                headers :  { "Content-Type": "application/x-www-form-urlencoded" },
            })
            .then(res => {
                if(res?.data?.success){
                    localStorage.setItem('id',res.data.data);
                    toast.success(res.data.message);
                }
            })
            .catch(error => {
                console.log("error", error.response);
                toast.error(error.response.data.message || "Something went Wrong..!");
            })
        }else{
            toast.error("Please Enter Email");
            console.log(false);
        }

    }
    return (
        <div className="form-of-login">
            <div className="center-form">
                <h6>Forget Password</h6>
                <form onSubmit={(e) => {submitHandler(e)}} className="login">
                    <div>
                        <input type="text" placeholder="Email" onChange={inputHandler} className="input" />
                        <span className="input-span"></span>
                    </div>
                    <div>
                        <button value="emailSend" type='submit' className="btn">Send</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
