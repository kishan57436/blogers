
import { handleError } from '../helpers/Handlererror.js'
import cloudinary from '../config/Cloudinary.js'
import User from '../models/User.js'
import bcryptjs from 'bcryptjs'
import Blog from '../models/Blog.js'
import Comment from '../models/Comment.js'




export const getuser=async(req,res,next)=>{

    try{
        const{userid}=req.params
        const user=await User.findById({_id:userid}).lean().exec()
        // this way we have to do answer so easily without having any problem we can do it without having any problme this way we 
        // cna solved the answer easilye without having any problem this way we can get the answer 
        if(!user)
        {
            next(handleError(400,'user not found'))
        }

        res.status(200).json({
            success:true,
            user,
            message:'user data found'
        })


    }
    catch(error)
    {
next(handleError(500,error.message))
    }
}




export const updateUser = async (req, res, next) => {
    try {
        console.log("update user me aa gy hau",req.file)
        const data = JSON.parse(req.body.data)
        const { userid } = req.params

        const user = await User.findById(userid)
        user.name = data.name
        user.email = data.email
        user.bio = data.bio

        if (data.password && data.password.length >= 8) {
            const hashedPassword = bcryptjs.hashSync(data.password)
            user.password = hashedPassword
        }

        if (req.file) {
            // Upload an image
            const uploadResult = await cloudinary.uploader
                .upload(
                    req.file.path,
                    { folder: 'kishan', resource_type: 'auto' }
                )
                .catch((error) => {
                    next(handleError(500, error.message))
                });

            user.avatar = uploadResult.secure_url
        }

        await user.save()

        const newUser = user.toObject({ getters: true })
        delete newUser.password
        console.log("let me check new user in user controller",newUser)
        res.status(200).json({
            success: true,
            message: 'Data updated.',
            user:newUser
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}


export const getAllUser = async (req, res, next) => {
    try {
        const user = await User.find().sort({ createdAt: -1 })
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}
export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params
     
        await Comment.deleteMany({ user: id });
        await Blog.deleteMany({ author: id });
        await User.findByIdAndDelete(id);
       
        //const user = await User.findByIdAndDelete(id)
      
        

        res.status(200).json({
            success: true,
            message: 'Data deleted.'
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}