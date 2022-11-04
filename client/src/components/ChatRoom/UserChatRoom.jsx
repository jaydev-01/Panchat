import React from 'react'

export default function UserChatRoom() {
  const senderMenu = () => {
    document.querySelector('.sender-setting-div').classList.toggle("show-sender-setting-div");
  }

  const backTochat = () => {
    document.querySelector('#chatList').classList.remove("close-whole-chat-list");
    document.querySelector('#chatList').classList.add("chat-list");
    document.querySelector('#chatRoom').classList.remove("open-full-chat-room");
    document.querySelector('#chatRoom').classList.add("chat-room");
    document.querySelector('.backBtn').classList.remove("show-backBtn");
  }

  return (
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
  )
}
