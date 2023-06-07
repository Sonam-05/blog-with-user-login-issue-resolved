const postModel = require("../models/postModel");

//createPostCtrl
const createPostCtrl = async (req, res) => {
    try {
        const { title, description, photo, createdBy } = req.body;
        if (!title) {
            return res.status(201).send({ success: false, message: 'title is required' })
        } else if (!description) {
            return res.status(201).send({ success: false, message: 'description is required' })
        } else if (!photo) {
            return res.status(201).send({ success: false, message: 'photo is required' })
        } else if (!createdBy) {
            return res.status(201).send({ success: false, message: 'createdBy is required' })
        }
        const post = new postModel(req.body);
        await post.save();
        return res.status(200).send({ success: true, message: 'Post created successfully', post });
    } catch (error) {
        return res.status(500).send({ success: false, message: `Something went wrong in createPostCtrl : ${error}` });
    }
}

//updatePostCtrl
const updatePostCtrl = async (req, res) => {
    try {
        const id = req.params;
        const { title, description, photo, createdBy } = req.body;
        if (!title) {
            return res.status(201).send({ success: false, message: 'title is required' })
        } else if (!description) {
            return res.status(201).send({ success: false, message: 'description is required' })
        } else if (!photo) {
            return res.status(201).send({ success: false, message: 'photo is required' })
        } else if (!createdBy) {
            return res.status(201).send({ success: false, message: 'createdBy is required' })
        }
        const updatedPost = await postModel.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
        return res.status(200).send({ success: true, message: `${title} post updated successfully`, updatedPost });
    } catch (error) {
        return res.status(500).send({ success: false, message: `Something went wrong in updatePostCtrl : ${error}` });
    }
}

//deletePostCtrl
const deletePostCtrl = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await postModel.findByIdAndDelete(id);
        return res.status(200).send({ success: true, message: `${post.title} deleted successfully`, post });
    } catch (error) {
        return res.status(500).send({ success: false, message: `Something went wrong in deletePostCtrl : ${error}` });
    }
}

//getAllPostsCtrl
const getAllPostsCtrl = async (req, res) => {
    try {
        const posts = await postModel.find();
        return res.status(200).send({ success: true, message: 'All posts fetched successfully', posts });
    } catch (error) {
        return res.status(500).send({ success: false, message: `Something went wrong in getAllPostsCtrl : ${error}` });
    }
}

//getSinglePostCtrl
const getSinglePostCtrl = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await postModel.findOne({ _id: id });
        return res.status(200).send({ success: true, message: `${post.title} fetched successfully`, post })
    } catch (error) {
        return res.status(500).send({ success: false, message: `Something went wrong in getSinglePostCtrl : ${error}` });
    }
}

//searchPostsCtrl 
const searchPostsCtrl = async (req, res) => {
    try {
        const { keyword } = req.params;
        const posts = await postModel.find({
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        })
        return res.status(200).send({ success: true, message: `posts fetched successfully`, posts })
    } catch (error) {
        return res.status(500).send({ success: false, message: `Something went wrong in getSinglePostCtrl : ${error}` });
    }
}

module.exports = { createPostCtrl, updatePostCtrl, deletePostCtrl, getAllPostsCtrl, getSinglePostCtrl, searchPostsCtrl };

