import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    bio:{
        type:String,
        trim:true
    },
    avatar:{
        type:String,
        trim:true
    },
    password:{
        type:String,
        trim:true,
        required:true
    }
    
})

const User=mongoose.model("User",userSchema,"users");
export default User;