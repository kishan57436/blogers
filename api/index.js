
// //const express=require('express')
// import express from 'express'
// import dotenv from 'dotenv'
// import cookieparser from 'cookie-parser'
// import cors from 'cors'
// import mongoose from 'mongoose'
import router from './routes/Authroutes.js'

// dotenv.config();
// const port = process.env.PORT
// const app = express();
// app.use(express.json())// frontent se json me send kar sake aur backend se usi me read kar sake
// app.use(cookieparser())// llllbecause  sath frontednt api request frontedt ke sath acookie aur vackend me bej sake
// // esa tool chaye to cookie se data nikal paye
// //frontend aur backedn dono hi alga alg port ho rha to api ke doron hame error dikhna padega
// // cors error ayega diffrent domin ke bich communticton setup // cors croos origin request(jo allow nhi ota ha)

// app.use(cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true


// }))


// // route setpus this way we are going to solved

// app.use('/api/auth',router)
// mongoose.connect(process.env.MONGODB_URL, { dbName: 'kishanblog' })
//     .then(() => console.log("database connected")).catch((err) => console.log('database connection failed', err))

// // for error handling  we use middleware this way we cna use 
// app.use((err, req, res, next) => {
//     const statuscode = err.statuscode || 500
//     const message = err.message || 'internal  server error'
//     res.status(statuscode).json({
//         success: false,
//         statuscode,
//         message
//     })


// })

// app.listen(port, () => {
//     console.log('app listen successfuly have fun', port);
// })







import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import userroute from './routes/Userroutes.js'
import CategoryRoute from './routes/Categoryroutes.js'
import Blogroutes from './routes/Blogroutes.js'
import CommentRouote from './routes/Commentroutes.js'

import BlogLikeRoute from './routes/Likeroutes.js'



dotenv.config()

const PORT = process.env.PORT
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))


// route setup  

app.use('/api/auth', router)
app.use('/api/user',userroute)
app.use('/api/category',CategoryRoute)
app.use('/api/blog',Blogroutes)
app.use('/api/comment',CommentRouote)
app.use('/api/blog-like',BlogLikeRoute)



mongoose.connect(process.env.MONGODB_URL, { dbName: 'kishan-blog' })
    .then(() => console.log('Database connected.'))
    .catch(err => console.log('Database connection failed.', err))

app.listen(PORT, () => {
    console.log('Server running on port:', PORT)
})


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal server error.'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})