const commentModel = require("../models/commentModel");
const userModel = require("../models/userModel");

//createCommentCtrl
const createCommentCtrl = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userId)
        const newComment = new commentModel({ ...req.body, commentUser: user.username });
        await newComment.save();
        return res.status(200).send({ success: true, message: 'Comment added successfully', newComment })
    } catch (error) {
        return res.status(500).send({ success: false, message: `Something went wrong in createCommentCtrl : ${error}` })
    }
}

//updateCommentCtrl
const updateCommentCtrl = async (req, res) => {
    try {
        const updatedComment = await commentModel.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
        return res.status(200).send({ success: true, message: 'Comment updated successfully', updatedComment })
    } catch (error) {
        return res.status(500).send({ success: false, message: `Something went wrong in updateCommentCtrl : ${error}` })
    }
}

//deleteCommentCtrl
const deleteCommentCtrl = async (req, res) => {
    try {
        await commentModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({ success: true, message: 'Comment deleted successfully' })
    } catch (error) {
        return res.status(500).send({ success: false, message: `Something went wrong in deleteCommentCtrl : ${error}` })
    }
}

//getAllCommentsCtrl
const getAllCommentsCtrl = async (req, res) => {
    try {
        const comments = await commentModel.find().populate('postId');
        return res.status(200).send({ success: true, message: 'All comments fetched successfully', comments })
    } catch (error) {
        return res.status(500).send({ success: false, message: `Something went wrong in getAllCommentsCtrl : ${error}` })
    }
}

//getAllCommentsPostIdCtrl
const getAllCommentsPostIdCtrl = async (req, res) => {
    try {
        const comments = await commentModel.find({ postId: req.params.postId });
        return res.status(200).send({ success: true, message: 'All comments fetched successfully', comments })
    } catch (error) {
        return res.status(500).send({ success: false, message: `Something went wrong in getAllCommentsCtrl : ${error}` })
    }
}

//getSingleCommentCtrl
const getSingleCommentCtrl = async (req, res) => {
    try {
        const comment = await commentModel.findById(req.params.id).populate('postId');
        return res.status(200).send({ success: true, message: 'Comment added successfully', comment })
    } catch (error) {
        return res.status(500).send({ success: false, message: `Something went wrong in getSingleCommentCtrl : ${error}` })
    }
}

module.exports = { createCommentCtrl, updateCommentCtrl, deleteCommentCtrl, getAllCommentsCtrl, getAllCommentsPostIdCtrl, getSingleCommentCtrl }

