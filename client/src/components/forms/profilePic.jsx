import axios from 'axios';
import React, {useRef, useState} from 'react'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function ProfilePic() {
    const inputRef = useRef(null);

    const navigate = useNavigate(null);

    const handleClick = () => {
        inputRef.current.click();
    };

    const [imagePath, setImagePath] = useState('../Chit_Chat.png');

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

    const skipSetProfile = (e) => {
        e.preventDefault();
        localStorage.setItem("profilePic","../Chit_Chat.png");
        navigate('/');
    }

    const uploadProfile = (e) => {
        e.preventDefault();
        const myurl = `${process.env.REACT_APP_URL}api/panchat/save-image`;
        let bodyFormData = new URLSearchParams();
        bodyFormData.append("pic",imagePath);
        const token = localStorage.getItem("dm_user_token");
        axios({
            method : "post",
            url : myurl,
            data : bodyFormData,
            headers : { 
                "Content-Type": "application/x-www-form-urlencoded" ,
                "authorization" : 'Bearer ' + token,
            },
        })
        .then(result => {
            if(result?.data?.success){
                console.log("Profile Set successfully!");
                console.log(result.data.data);
                setImagePath(result.data.data.pic);
                console.log(imagePath);
                localStorage.setItem("profilePic",imagePath);
                toast.success(result.data.message);
                navigate('/');
            }
        })
        .catch(error => {
            console.log(error);
            toast.error(error.response.data.message || error.response.data);
        })
    }


    return (
        <div className="form-of-login">
            <div className="center-form">

                <form action="" className="login">
                    <h6>Profile Picture</h6>
                    <div id="profilePic" className="profile-pic" onClick={handleClick}>
                        <label htmlFor='profilePic'><img src={imagePath} alt="" className="pic-fit" /></label>
                        <input
                            style={{ display: 'none' }}
                            ref={inputRef}
                            type="file"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="inRow">
                        <button value="upload" className="btn1" onClick={(e) => uploadProfile(e)}>Upload</button>
                        <button value="skip" className="btn1" onClick={(e) => skipSetProfile(e)}>Skip</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
