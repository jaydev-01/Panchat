const db = require('../models');
const Users = db.user;
const md5 = require('md5');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const transport = require('../helpers/mailer');
const { response } = require('express');

exports.signup = async (req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const checkUser = await Users.findOne({email : req.body.email});

    if(checkUser === null){
       const user = new Users({
         name : req.body.name,
         email : req.body.email,
         password : md5(req.body.password),
         mobileno : req.body.mobileno,
         pic : ''
       })
        user.save(user).then((data) => {
            const token = jwt.sign({
                email : data.email, id : data._id
            },process.env.SECRET_KEY);
    
            res.status(200).send({
                success : true,
                data : {token,user},
                message : "Sign Up Successfully!"
            })
            
           }).catch((error) => {
            res.status(300).send({
                success : false,
                data : null,
                message : error || "SOME ERROR IN SIGNN UP"
            })
           })
       
    }else{
        res.status(300).send({
            success : false,
            data : null,
            message : "User Already Exist"
        })
    }
}

exports.login = async (req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const checkUser = await Users.findOne({email : req.body.email, password : md5(req.body.password)});

    if(checkUser !== null){
        const token = jwt.sign({
            email : checkUser.email, id : checkUser._id
        },process.env.SECRET_KEY);

        res.status(200).send({
            success : true,
            data : {token,checkUser},
            message : "Login Successfully!"
        })

    }else{
        res.status(300).send({
            success : false,
            data : null,
            message : "User Does not exist"
        })
    }
}

exports.validateEmailAndSendResetLink = async (req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const checkUser = await Users.findOne({email : req.body.email});

    if(checkUser !== null){
        transport.sendMail({
            from : `Panchat <${process.env.EMAIL_USER}>`,
            to : req.body.email,
            subject : "Password Reset Link",
            text : "You Password Reset Link is given here!",
            html : `<div style="text-align : center;">
            <h1>Password Reset Link</h1>
            <a href="http://localhost:3000/reset-password" style="border : 1px solid red;color : red;text-decoration : none;padding : 10px;border-radius : 10px" onMouseOver="this.style.color= 'white';this.style.backgroundColor= 'red'" onMouseOut="this.style.color= 'red';this.style.backgroundColor= 'white'">Reset Password</a>
            </div>`
        }).then( response => {
                res.status(200).send({
                    success : true,
                    data : checkUser._id,
                    message : "Email Send Successfully!"
                })
        }).catch(error =>{
            res.status(300).send({
                success : false,
                data : null,
                message : error
            })
        })
       
    }else{
        res.status(301).send({
            success : false,
            data : null,
            message : "User Does not exist"
        })
    }
}

exports.UpdatePassword = async (req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    if(req.body.id){
        const checkUser = await Users.findOne({_id : req.body.id});
    
        if(checkUser !== null){
            await Users.findByIdAndUpdate(req.body.id,{password : md5(req.body.password)},{ useFindAndModify: false })
            .then((result) => {
                res.status(200).send({
                    success : true,
                    data : null,
                    message : "Password reset successfully!"
                })
            })
            .catch(error => {
                res.status(300).send({
                    success : false,
                    data : null,
                    message : error
                })
            })
        }else{
            res.status(401).send({
                success : false,
                data : null,
                message : "User Does not exist"
            })
        }
    }else{
        res.status(401).send({
            success : false,
            data : null,
            message : "You already had reset password!"
        })
    }
}

exports.uploadImage = async (req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const storage = multer.diskStorage({
        destination : function(req, file, callback){
            callback(null, "./public/uploads/");
        },
        filename : function(req,file,callback){
            callback(null, md5(Date.now()) + path.extname(file.originalname));
        }
    });

    const uploadFile = multer({
        storage : storage,
    }).single("image");

    uploadFile(req,res, async (err) => {
        if(!req.file){
            res.status(300).send({
                success :false,
                data : null,
                message : "Select Image"
            });
        }else if(err){
            res.status(300).send({
                success : false,
                data : null,
                message : "Image not uploaded!"
            });
        }else{
            res.status(200).send({
                success : true,
                data : {
                    file_url : process.env.MAIN_URL + 'uploads/' + req.file.filename,
                },
                message : "Image uploded Successfully!"
            })
        }
    })
}

exports.saveImage = async (req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const user = req.user;
    // console.log(user);
    if(user){
        Users.findOne({_id : user.id}).then((result) => {
            if(result != null){
                if(result.pic !== ''){
                    fs.unlinkSync(result.pic);
                }
                Users.findByIdAndUpdate(result._id,{
                    pic : req.body.pic
                },
                { useFindAndModify: false }
                ).then(async result => {
                    const newResult =await  Users.findOne({_id : result._id});
                    res.status(200).send({
                        success : true,
                        data : newResult,
                        message : "Profile Set Successfully"
                    })
                }).catch(error => {
                    res.status(301).send({
                        success : false,
                        data : null,
                        message : error || "Some error occure in uploading image",
                    })
                })
            }else{
                res.status(300).send({
                    success : false,
                    data : null,
                    message : "User Not Found!"
                })
            }
        }).catch(error => {
            res.status(302).send({
                success : false,
                data : null,
                message : error || "Some error occure in finding user",
            })
        })

    }else{
        res.status(300).send({
            success : false,
            data : null,
            message : "Invalid Token"
        })
    }
}