const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//registerCtrl
const registerCtrl = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username) {
            return res.status(201).send({ success: false, message: 'username is required' })
        } else if (!email) {
            return res.status(201).send({ success: false, message: 'email is required' })
        } else if (!password) {
            return res.status(201).send({ success: false, message: 'password is required' })
        }
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(201).send({ success: false, message: 'Already a user, SignIn' })
        } else {
            const password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            req.body.password = hashedPassword;
            const newUser = new userModel(req.body);
            await newUser.save();
            return res.status(200).send({ success: true, message: 'Registered Successfully' })
        }
    } catch (error) {
        res.status(500).send({ success: false, message: `Error in registerCtrl error : ${error}` })
    }
}

//loginCtrl
const loginCtrl = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.status(201).send({ success: false, message: 'email is required' })
        } else if (!password) {
            return res.status(201).send({ success: false, message: 'password is required' })
        }
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(201).send({ success: false, message: 'No such user found, Sign up' })
        } else {
            const isPasswordMatched = await bcrypt.compare(req.body.password, user.password);
            if (isPasswordMatched == true) {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETKEY, { expiresIn: "7d" });
                console.log(token);
                return res.status(200).send({ success: true, message: 'Login successful', user, token })
            } else {
                return res.status(201).send({ success: false, message: 'Invalid credentials' })
            }
        }
    } catch (error) {
        res.status(500).send({ success: false, message: `Error in loginCtrl error : ${error}` })
    }
}

//updateUserCtrl
const updateUserCtrl = async (req, res) => {
    try {
        const { username, email } = req.body;
        if (!username) {
            return res.status(201).send({ success: false, message: 'username is required' })
        } else if (!email) {
            return res.status(201).send({ success: false, message: 'email is required' })
        }
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
        return res.status(200).send({ success: true, message: `${updatedUser?.username} updated successfully`, updatedUser });
    } catch (error) {
        res.status(500).send({ success: false, message: `Error in updateUserCtrl error : ${error}` })
    }
}

//deleteUserCtrl
const deleteUserCtrl = async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({ success: true, message: `${user.username} deleted successfully`, user });
    } catch (error) {
        res.status(500).send({ success: false, message: `Error in deleteUserCtrl error : ${error}` })
    }
}

//getAllUsersCtrl
const getAllUsersCtrl = async (req, res) => {
    try {
        const users = userModel.find();
        return res.status(200).send({ success: true, message: 'all users fetched successfully', users });
    } catch (error) {
        res.status(500).send({ success: false, message: `Error in getAllUsersCtrl error : ${error}` })
    }
}

//getSingleUserCtrl
const getSingleUserCtrl = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        return res.status(200).send({ success: true, message: `${user.username} fetched successfully`, user });
    } catch (error) {
        res.status(500).send({ success: false, message: `Error in getSingleUserCtrl error : ${error}` })
    }
}

//getLoggedInUserCtrl
const getLoggedInUserCtrl = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userId);
        user.password = ""
        return res.status(200).send({ success: true, user });
    } catch (error) {
        res.status(500).send({ success: false, message: `Error in getSingleUserCtrl error : ${error}` })
    }
}

module.exports = { registerCtrl, loginCtrl, updateUserCtrl, deleteUserCtrl, getAllUsersCtrl, getSingleUserCtrl, getLoggedInUserCtrl }