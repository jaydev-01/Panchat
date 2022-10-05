import React from 'react'

export default function chatroom() {
    const openMenu = () =>{
        document.querySelector('.setting').classList.toggle("click");
        document.querySelector('.setting-div').classList.toggle("show-setting-div");
    }

    const senderMenu = () => {
        document.querySelector('.sender-setting-div').classList.toggle("show-sender-setting-div");
    }

    const openProfile = () =>{
        document.querySelector('.chat-list-block').classList.add("close-chat-list");
        document.querySelector('.your-profile-block').classList.add("open-profile-block");
        document.querySelector('.update-profile-info').classList.add("close-profile-update-block");
    }

    const updateProfile = () => {
        document.querySelector('.update-profile-info').classList.remove("close-profile-update-block");
        document.querySelector('.update-profile-info').classList.add("open-update-profile-block");
        document.querySelector('.profile-info').classList.add("close-profile-block");
    }

    const backInProfile = () => {
        let styleOfProfileHead = getComputedStyle(document.querySelector('.profile-info'));
        if(styleOfProfileHead.display === 'none'){
            document.querySelector('.profile-info').classList.remove("close-profile-block");
            document.querySelector('.update-profile-info').classList.remove("open-update-profile-block");
            document.querySelector('.update-profile-info').classList.add("close-profile-update-block");
        }else{
            document.querySelector('.chat-list-block').classList.remove("close-chat-list");
            document.querySelector('.your-profile-block').classList.remove("open-profile-block");
            openMenu();
        }
    }

    const openRoom = () => {
        document.querySelector('#chatList').classList.add("close-whole-chat-list");
        document.querySelector('#chatList').classList.remove("chat-list");
        document.querySelector('#chatRoom').classList.add("open-full-chat-room");
        document.querySelector('#chatRoom').classList.remove("chat-room");
        document.querySelector('.backBtn').classList.add("show-backBtn");
    }

    const backTochat = () => {
        document.querySelector('#chatList').classList.remove("close-whole-chat-list");
        document.querySelector('#chatList').classList.add("chat-list");
        document.querySelector('#chatRoom').classList.remove("open-full-chat-room");
        document.querySelector('#chatRoom').classList.add("chat-room");
        document.querySelector('.backBtn').classList.remove("show-backBtn");
    }

    return (
        <div className="main-container">
            <div className="chat-room-container">
                <div className="chat-list" id='chatList'>

                    <div className="your-profile-block">
                        <div className="block-head" id="pbackBtn">
                            <span className="backBtn1" onClick={backInProfile}></span>
                            <span className="title">Profile</span>
                        </div>

                        <div className="user-profile">
                            <div className="profile-info">
                                <div className="profile-pic">
                                    <img src="/Chit_Chat.png" alt="" className="pic-fit" />
                                </div>
                                <div className="profile-row-detail">
                                    <div className="row-detail">
                                        <span className="tag">Your Name</span>
                                        <span className="info">Jaydev Jadav</span>
                                    </div>
                                    <div className="row-detail">
                                        <span className="tag">Email</span>
                                        <span className="info">Jaydevjadav.015@gmail.com</span>
                                    </div>
                                    <div className="change-btn">
                                        <button value="update" onClick={updateProfile} className="btn2">Update</button>
                                    </div>
                                </div>
                            </div>

                            <div className="update-profile-info">
                                <div className="profile-pic1">
                                    <img src="/Chit_Chat.png" alt="" className="pic-fit" />
                                </div>
                                <div className="profile-detail-update">
                                    <div className="row-detail">
                                        <input type="text" placeholder="Name" className="input1" />
                                    </div>
                                    <div className="row-detail">
                                        <input type="text" placeholder="Email" className="input1" />
                                    </div>
                                    <div className="change-save-btn">
                                        <button value="update" id="updatesave" className="btn2">Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="chat-list-block">
                        <div className="search-setting">
                            <div className="search">
                                <input type="text" name="search" placeholder="search" className="search-input" />
                            </div>
                            <div className="setting" id="settingMenu" onClick={openMenu}>
                                <span className="bar1"></span>
                                <span className="bar2"></span>
                                <span className="bar3"></span>
                            </div>
                            <div className="setting-div">
                                <li>New Group</li>
                                <li onClick={openProfile}>Profile</li>
                                <li>Mode</li>
                            </div>
                        </div>

                        <div className="sender-list" id="senderList">
                            <div className="sender" onClick={openRoom}>
                                <div className="sender-image-name-msg">
                                    <img src="/Chit_Chat.png" alt="" />
                                    <div className="sender-detail">
                                        <span className="sender-name">Parth Mistry</span>
                                        <span className="sender-last-msg">Last Msg</span>
                                    </div>
                                </div>
                                <div className="sender-msg-count">
                                    <span className="msg-count">1</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


                <div className="chat-room" id='chatRoom'>
                    <div className="no-chat-yet">
                        <img src="/Chit_Chat.png" alt="" className="no-chat-logo" />
                    </div>

                    <div className="croom">
                        <div className="chatroom-sender">
                            <div className="chatroom-sender-image">
                                <span className="backBtn" onClick={backTochat}></span>
                                <img src="/Chit_Chat.png" alt="" />
                                <span className="chatroom-sender-name">Parth Mistry</span>
                            </div>
                            <div className="chatroom-sender-setting" onClick={senderMenu}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div className="sender-setting-div">
                                <li>Mute</li>
                                <li>Delete</li>
                            </div>
                        </div>
                        <div className="room">

                        </div>
                        <div className="msg-writer">
                            <form action="" className="msg-writer-box">
                                <input type="text" className="msgBox" placeholder="Message" />
                                <a href='#' className="sendBtn">
                                  Send
                                </a>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
