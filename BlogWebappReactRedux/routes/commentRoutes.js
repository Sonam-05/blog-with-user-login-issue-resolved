const express = require("express");
const { createCommentCtrl, updateCommentCtrl, deleteCommentCtrl, getAllCommentsCtrl, getSingleCommentCtrl, getAllCommentsPostIdCtrl } = require("../controllers/commentControllers");
const userMiddleware = require("../middlewares/userMiddleware");

const router = express.Router();

//routes
//create-comment || POST
router.post('/create-comment', userMiddleware, createCommentCtrl)

//update-comment || PUT
router.put('/update-comment/:id', updateCommentCtrl)

//delete-comment || DELETE
router.delete('/delete-comment/:id', deleteCommentCtrl)

//get-all-coments || GET
router.get('/get-all-comments', getAllCommentsCtrl)

//get-all-comments on basis of postId 
router.get('/get-all-comments-postID/:postId', getAllCommentsPostIdCtrl)

//get-single-comment || GET
router.get('/get-single-comment/:id', getSingleCommentCtrl)

module.exports = router;