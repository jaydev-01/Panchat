import React from 'react'

export default function profilePic() {
    return (
        <div className="form-of-login">
            <div className="center-form">
                <h6>Profile Picture</h6>
                <form action="" className="login">
                    <div id="profilePic" className="profile-pic">
                        <img src="/Chit_Chat.png" alt="" className="pic-fit" />
                    </div>
                    <div>
                        <input type="file" className="input" />
                        <span></span>
                    </div>
                    <div className="inRow">
                        <button value="skip" className="btn1">Skip</button>
                        <button value="upload" className="btn1">Upload</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
