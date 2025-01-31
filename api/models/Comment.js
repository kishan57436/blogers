import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    blogid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Blog'
    },
    comment: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: true })
// we always used to prefer to use timestamps this way we could so easily wihtout having any loss this way we can done
// withouth having so much pressure lets do it tis way we could done wihtout 

const Comment = mongoose.model('Comment', commentSchema, 'comments')
export default Comment 