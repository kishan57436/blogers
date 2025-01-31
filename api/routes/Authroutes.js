import express from 'express'
import { GoogleLogin, Login, Logout, Register } from '../controllers/Auth.js'
import { authenticate } from '../Middleware/authenicate.js'

const router=express.Router()

router.post('/register', Register)
router.post('/login',Login)
router.post('/google-login',GoogleLogin)
router.get('/logout',authenticate,Logout)

export default router