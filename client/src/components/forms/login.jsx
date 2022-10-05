import React from 'react'

export default function login() {
    return (
        <div className="form-of-login">
            <div className="center-form">
                <h6>Login</h6>
                <form action="" className="login">
                    <div>
                        <input type="text" placeholder="Email" className="input" />
                        <span className="input-span"></span>
                    </div>
                    <div>
                        <input type="password" placeholder="Password" className="input" />
                        <span className="input-span"></span>
                    </div>
                    <div className="login-span">
                        <span><a href="forget-password">forget password?</a> </span>
                    </div>
                    <div>
                        <button value="login" className="btn">Login</button>
                    </div>
                    <div  className="new-ac-span">
                        Don't have account?<span> <a href="/sign-up"> Create Account</a></span>
                    </div>
                </form>
            </div>
        </div>
    )
}
