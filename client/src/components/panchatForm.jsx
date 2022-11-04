import React from 'react'
import PasswordReset from './forms/ResetPassword'
import Login from './forms/Login'
import Signup from './forms/Signup'
import PasswordForget from './forms/ForgetPassword'
import ProfileUpload from './forms/ProfilePic'

export default function panchatForm(props) {
    const { type } = props;
    if (type === 'reset') {
        return (
            <div className="main-container">
                <div className="login-form-container">
                    <div className="login-form div-child">
                        <PasswordReset />
                    </div>
                </div>
            </div>
        )
    } else if (type === 'login') {
        return (
            <div className="main-container">
                <div className="login-form-container">
                    <div className="login-form div-child">
                        <Login />
                    </div>
                </div>
            </div>
        )
    } else if (type === 'signup') {
        return (
            <div className="main-container">
                <div className="login-form-container">
                    <div className="login-form div-child">
                        <Signup />
                    </div>
                </div>
            </div>
        )
    } else if (type === 'forgetpassword') {
        return (
            <div className="main-container">
                <div className="login-form-container">
                    <div className="login-form div-child">
                        <PasswordForget />
                    </div>
                </div>
            </div>
        )
    } else if (type === 'profile') {
        return (
            <div className="main-container">
                <div className="login-form-container">
                    <div className="login-form div-child">
                        <ProfileUpload />
                    </div>
                </div>
            </div>
        )
    }

}
