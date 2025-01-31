import express from 'express'
import { doLike, likeCount } from '../controllers/Like.controller.js'
import { authenticate } from '../Middleware/authenicate.js'


const BlogLikeRoute = express.Router()

BlogLikeRoute.post('/do-like',authenticate, doLike)
BlogLikeRoute.get('/get-like/:blogid/:userid?', likeCount)

export default BlogLikeRoute