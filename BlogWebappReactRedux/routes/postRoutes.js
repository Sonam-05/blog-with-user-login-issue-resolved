const express = require("express");
const { createPostCtrl, updatePostCtrl, deletePostCtrl, getAllPostsCtrl, getSinglePostCtrl, searchPostsCtrl } = require("../controllers/postControllers");

const router = express.Router();

//routes
//create-post || POST
router.post('/create-post', createPostCtrl)

//update-post || PUT
router.put('/update-post/:id', updatePostCtrl)

//delete-post || DELETE
router.delete('/delete-post/:id', deletePostCtrl)

//get-all-posts || GET
router.get('/get-all-posts', getAllPostsCtrl)

//get-single-post || GET
router.get('/get-single-post/:id', getSinglePostCtrl)

//search-posts || GET
router.get('/search-posts/:keyword', searchPostsCtrl)

module.exports = router;