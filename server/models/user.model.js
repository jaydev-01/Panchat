module.exports = mongoose =>{
    const UserSchema = mongoose.Schema({
        name : {type : String, require : true},
        email : {type : String, require : true,unique : true},
        mobileno : {type : String, require : true},
        password : {type : String, require : true},
        pic : {
            type : String,
            require : true,
            default: "",
        },
        reset : {type : Boolean, defualt : false}
    },
    { timestapms : true }
    );


    const User = mongoose.model("user", UserSchema);
    return User;
};