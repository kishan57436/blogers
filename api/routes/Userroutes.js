import express from 'express'
import { deleteUser, getAllUser, getuser } from '../controllers/user.js'
import { updateUser } from '../controllers/user.js'
import upload from '../config/Multer.js'
import { authenticate } from '../Middleware/authenicate.js'
const userroute=express.Router()

userroute.use(authenticate)

userroute.get('/get-user/:userid',getuser)
userroute.put('/update-user/:userid', upload.single('file'), updateUser)
userroute.get('/get-all-user', getAllUser)
userroute.delete('/delete/:id', deleteUser)


export default userroute;