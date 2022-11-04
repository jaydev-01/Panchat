import React,{ useState } from 'react'
import ChatList from './ChatRoom/ChatList';
import UserChatRoom from './ChatRoom/UserChatRoom';

export default function Chatroom() {
    const [chatStart,setChatStart] = useState(false);
    return (
        <div className="main-container">
            <div className="chat-room-container">
                <ChatList />

                <div className="chat-room" id='chatRoom'>
                    {chatStart ? `<div className="no-chat-yet">
                        <img src="/Chit_Chat.png" alt="" className="no-chat-logo" />
                    </div>` : <UserChatRoom />}
                </div>

            </div>
        </div>
    )
}
