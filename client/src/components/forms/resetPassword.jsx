import React from 'react'

export default function resetPassword() {
    return (
        <div className="form-of-login">
            <div className="center-form">
                <h6>Reset Password</h6>
                <form action="" className="login">
                    <div>
                        <input type="password" placeholder="Password" className="input" />
                        <span className="input-span"></span>
                    </div>
                    <div>
                        <input type="password" placeholder="Confirm Password" className="input" />
                        <span className="input-span"></span>
                    </div>
                    <div>
                        <button value="reset" className="btn">Reset</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
