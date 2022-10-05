import React from 'react'

export default function signup() {
    return (

        <div className="form-of-login">
            <div className="center-form">
                <h6>Sign Up</h6>
                <form action="" className="login">
                    <div>
                        <input type="text" placeholder="Email" className="input" />
                        <span className="input-span"></span>
                    </div>
                    <div>
                        <input type="text" placeholder="Mobile No" className="input" />
                        <span className="input-span"></span>
                    </div>
                    <div>
                        <input type="password" placeholder="Password" className="input" />
                        <span className="input-span"></span>
                    </div>
                    <div>
                        <input type="password" placeholder="Confirm Password" className="input" />
                        <span className="input-span"></span>
                    </div>
                    <div>
                        <button value="signup" className="btn">Sign Up</button>
                    </div>
                    <div className="new-ac-span">
                        Have Account?<span> <a href="/login">Log In</a></span>
                    </div>
                </form>
            </div>
        </div>

    )
}
