import React from 'react'

export default function forgetPassword() {
    return (
        <div className="form-of-login">
            <div className="center-form">
                <h6>Forget Password</h6>
                <form action="" className="login">
                    <div>
                        <input type="text" placeholder="Email" className="input" />
                        <span className="input-span"></span>
                    </div>
                    <div>
                        <button value="emailSend" className="btn">Send</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
