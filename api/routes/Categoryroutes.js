import express from 'express'
import { addCategory, deleteCategory, getAllCategory, showCategory, updateCategory } from '../controllers/Category.controller.js'
import { onlyadmin } from '../Middleware/onlyadmin.js'
//import  } from '../middlewar.js'

const CategoryRoute = express.Router()

CategoryRoute.post('/add',onlyadmin, addCategory)
CategoryRoute.put('/update/:categoryid',onlyadmin, updateCategory)
CategoryRoute.get('/show/:categoryid',onlyadmin, showCategory)
CategoryRoute.delete('/delete/:categoryid',onlyadmin, deleteCategory)
CategoryRoute.get('/all-category', getAllCategory)


export default CategoryRoute