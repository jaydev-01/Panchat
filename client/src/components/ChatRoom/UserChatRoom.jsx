import React from 'react'

import { useState, useEffect } from 'react';
import io from "socket.io-client";

const socket = io.connect("http://localhost:3032")

export default function UserChatRoom() {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [userName,setUserName] = useState("jaydev");

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, userName });
    setMessage("");
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  });

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
      {chat.map((payload, index) => {
          return (
            <p key={index}>
              {payload.message}: <span>id: {payload.userName}</span>
            </p>
          );
        })}
      </div>
      <div className="msg-writer">
        <form action="" className="msg-writer-box">

          <input 
          type="text" 
          className="msgBox" 
          placeholder="Message"
          value={message}
          onChange={(e) => {
               setMessage(e.target.value);
            }}
           />

          <a href='#' className="sendBtn" onClick={sendChat}>
            Send
          </a>
        </form>
      </div>
    </div>
  )
}
