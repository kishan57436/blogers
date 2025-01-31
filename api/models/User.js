import mongoose from "mongoose";

const userschema=new mongoose.Schema({

    role:
    {
        type:String,
        default:'user',
        enum:['user','admin'],
        required:true,
        trim:true
    },
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    email:
    {
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    bio:{
        type:String,
        trim:true
    },
    avatar:{
        type:String,
        trim:true,
    },
    password:
    {
        type:String,
        required:true,
        trim:true
    }
})


const User=mongoose.model('User',userschema,'users')

// this way 
export default User;