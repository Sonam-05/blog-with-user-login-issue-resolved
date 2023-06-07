const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    postId : {
        type: mongoose.ObjectId,
        ref: "posts",
    },
    commentUser: {
        type: String,
        required: true
    },
    commentDescription: {
        type: String,
        required : true
    },
    commentLikes: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const commentModel = mongoose.model('comments', commentSchema);
module.exports = commentModel;