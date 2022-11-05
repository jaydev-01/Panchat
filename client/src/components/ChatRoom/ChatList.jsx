import axios from 'axios';
import React, {useState,useRef} from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ChatList() {

    const inputRef = useRef(null);

    const [userdetail,setUserDetail] = useState({
        'email' : '',
        'name' : '',
    });
    const [imagePath, setImagePath] = useState('../Chit_Chat.png');

    const handleClick = () => {
        inputRef.current.click();
    };

    const InputEvent = (e) => {
        const newLoginInfo = { ...userdetail };
        newLoginInfo[e.target.name] = e.target.value;
        setUserDetail(newLoginInfo);
    };

    const handleFileChange = event => {
        const fileObj = event.target.files[0];

        if(!fileObj)
           return;

        event.target.value = null;
        console.log(fileObj);
        const myurl = `${process.env.REACT_APP_URL}api/panchat/upload-image`;
        let bodyFormData = new FormData();
        bodyFormData.append("image", fileObj);
        axios({
            method : "post",
            url : myurl,
            data : bodyFormData,
        }).then(result => {
            if(result?.data?.success){
                console.log("File uploaded successfully!");
                setImagePath(result?.data?.data?.file_url);
                console.log(imagePath);
                localStorage.setItem("profilePic",imagePath);
                toast.success(result.data.message);
            }
        }).catch(error => {
           console.log(error);
           toast.error(error.response.data.message);
        })
    }

    const openMenu = () =>{
        document.querySelector('.setting').classList.toggle("click");
        document.querySelector('.setting-div').classList.toggle("show-setting-div");
    }
    
    const openProfile = () =>{
        
        const myurl = `${process.env.REACT_APP_URL}api/panchat/get-user-detail`;
        const token = localStorage.getItem("dm_user_token");
        axios({
            method : "get",
            url : myurl,
            headers : { 
                "Content-Type": "application/x-www-form-urlencoded" ,
                "authorization" : 'Bearer ' + token,
            },
        })
        .then(result => {
            if(result?.data?.success){
                setUserDetail(result.data.data);
            }
        })
        .catch(error => {
            console.log(error);
            toast.error(error.response.data.message || error.response.data);
        })

        document.querySelector('.chat-list-block').classList.add("close-chat-list");
        document.querySelector('.your-profile-block').classList.add("open-profile-block");
        document.querySelector('.update-profile-info').classList.add("close-profile-update-block");
    }

    const changeProfileDetail = () => {

        let input = userdetail;
        let pic = imagePath;

        const myurl = `${process.env.REACT_APP_URL}api/panchat/update-profile`;
        const token = localStorage.getItem("dm_user_token");
        let bodyFormData = new URLSearchParams();
        bodyFormData.append("email", input['email']);
        bodyFormData.append("name", input['name']);
        bodyFormData.append('pic', pic);
        axios({
            method : 'post',
            url : myurl,
            data : bodyFormData,
            headers : { 
                "Content-Type": "application/x-www-form-urlencoded" ,
                "authorization" : 'Bearer ' + token,
            },
        })
        .then(result => {
            if(result?.data?.success){
                // let detail = {
                //     email : result.data.email,
                //     name : result.data.name
                // }
                // setUserDetail(detail);
                // setImagePath(result.data.pic);
                document.querySelector('.profile-info').classList.remove("close-profile-block");
                document.querySelector('.update-profile-info').classList.remove("open-update-profile-block");
                document.querySelector('.update-profile-info').classList.add("close-profile-update-block");
                // console.log(userdetail, imagePath);
                // toast.success(result.data.message);
            }
        })
        .catch(error => {
            console.log(error);
            toast.error(error.response.data.message || error.response.data);
        })
        
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


    return (
        <div className="chat-list" id='chatList'>

            <div className="your-profile-block">
                <div className="block-head" id="pbackBtn">
                    <span className="backBtn1" onClick={backInProfile}></span>
                    <span className="title">Profile</span>
                </div>

                <div className="user-profile">
                    <div className="profile-info">
                        <div className="profile-pic">
                            <img src={(userdetail !== null) ? ((userdetail.pic !== '') ? userdetail.pic : imagePath) : imagePath} alt="" className="pic-fit" id='userPic' />
                        </div>
                        <div className="profile-row-detail">
                            <div className="row-detail">
                                <span className="tag">Your Name</span>
                                <span className="info">{(userdetail !== null) ? userdetail.name : ''}</span>
                            </div>
                            <div className="row-detail">
                                <span className="tag">Email</span>
                                <span className="info">{(userdetail !== null) ? userdetail.email : ''}</span>
                            </div>
                            <div className="change-btn">
                                <button value="update" onClick={updateProfile} className="btn2">Update</button>
                            </div>
                        </div>
                    </div>

                    <div className="update-profile-info">
                        <div className="profile-pic1"  onClick={handleClick}>
                        <label htmlFor='profilePic'><img src={(userdetail !== null) ? ((userdetail.pic !== '') ? userdetail.pic : imagePath) : imagePath} alt="" className="pic-fit" /></label>
                        <input
                            style={{ display: 'none' }}
                            ref={inputRef}
                            type="file"
                            onChange={handleFileChange}
                        />
                        </div>
                        <div className="profile-detail-update">
                            <div className="row-detail">
                                <input type="text" placeholder={(userdetail !== null) ? userdetail.name : 'Name'} className="input1" onChange={(e) => InputEvent(e)} />
                            </div>
                            <div className="row-detail">
                                <input type="text" placeholder={(userdetail !== null) ? userdetail.email : 'Email'} className="input1"  onChange={(e) => InputEvent(e)}/>
                            </div>
                            <div className="change-save-btn">
                                <button value="update" id="updatesave" className="btn2" onClick={changeProfileDetail}>Save</button>
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
    )
}
