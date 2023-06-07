const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    photo : {
        type : String,
        required : true
    },
    createdBy : {
        type : String,
        required : true
    },
    likes : {
        type : Number,
        default : 0
    }
}, {timestamps : true});

const postModel = mongoose.model("posts", postSchema);
module.exports = postModel;