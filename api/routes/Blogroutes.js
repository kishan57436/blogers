import express from 'express'
import { addBlog, deleteBlog, editBlog, getAllBlogs, getBlog, getBlogByCategory, getRelatedBlog, search, showAllBlog, updateBlog } from '../controllers/Blog.controller.js';
import upload from '../config/Multer.js';
import { authenticate } from '../Middleware/authenicate.js';

const Blogroutes=express.Router();

Blogroutes.post('/add',authenticate,upload.single('file'),addBlog)
Blogroutes.get('/edit/:blogid',authenticate,editBlog)
Blogroutes.put('/updates/:blogid',authenticate,upload.single('file'),updateBlog)
Blogroutes.delete('/delete/:blogid',authenticate,deleteBlog)
Blogroutes.get('/get-all', authenticate,showAllBlog)
Blogroutes.get('/blogs', getAllBlogs)
Blogroutes.get('/get-blog/:slug',getBlog)

Blogroutes.get('/get-related-blog/:category/:blog', getRelatedBlog)
Blogroutes.get('/get-blog-by-category/:category', getBlogByCategory)
Blogroutes.get('/search', search)

export default Blogroutes