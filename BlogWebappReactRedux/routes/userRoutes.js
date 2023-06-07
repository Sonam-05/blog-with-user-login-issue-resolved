const express = require("express");
const { updateUserCtrl, deleteUserCtrl, getAllUsersCtrl, getSingleUserCtrl, registerCtrl, loginCtrl, getLoggedInUserCtrl } = require("../controllers/userControllers");
const userMiddleware = require("../middlewares/userMiddleware");

const router = express.Router();

//routes
//register-user || POST
router.post("/register", registerCtrl)

//login-user || POST
router.post("/login", loginCtrl)

//update-user ||PUT
router.put('/update-user/:id', updateUserCtrl)

//delete-user || DELETE
router.delete('/delete-user/:id', deleteUserCtrl)

//get-all-users || GET
router.get('/get-all-users', getAllUsersCtrl)

//get-single-user || GET
router.get('/get-single-user/:id',getSingleUserCtrl)

//get-loggedin-user || GET
router.get('/get-loggedin-user/', userMiddleware, getLoggedInUserCtrl)

module.exports = router;