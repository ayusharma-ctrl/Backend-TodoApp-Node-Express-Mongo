import { User } from "../models/user.js"
import bcrypt from 'bcrypt'
import { sendCookie } from "../utils/cookie.js"
import { Task } from "../models/task.js"

// 1
export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find({})
        res.json({
            success: true,
            users: allUsers,
        })
    }
    catch (e) {
        console.log(e);
    }
}

// 2
export const addNewUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email })
        if (user) {
            return res.status(404).json({
                success: false,
                message: "User is already exist!"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({
            name,
            email,
            password: hashedPassword
        })
        sendCookie(user, res, "Registered Succesfully!", 201)
    }
    catch (e) {
        console.log(e);
    }
}

// 3
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password")

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid username or password!"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(404).json({
                success: false,
                message: "Invalid username or password!"
            })
        }

        sendCookie(user, res, `Welcome back ${user.name}!`, 200)
    }
    catch (e) {
        console.log(e);
    }
}

// 4
export const getMyProfile = (req, res) => {
    try {

        res.json({
            success: true,
            user: req.user
        })
    }
    catch (e) {
        console.log(e);
    }
}

// 5
export const logout = (req, res) => {
    try {
        res.status(200).cookie("token", "", {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        }).json({
            success: true,
            message: "Logged Out!"
        })
    }
    catch (e) {
        console.log(e);
    }
}

// 6
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No such user Found!"
            })
        }

        await Task.deleteMany({ user: id })
        await user.deleteOne();
        res.status(200).cookie("token", "", {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        }).json({
            success: true,
            message: "Deleted!"
        })
    }
    catch (e) {
        console.log(e);
    }
}

// 7
export const updatePassword = async (req, res) => {
    try {
        const { password } = req.body;
        const { email } = req.user;
        const user = await User.findOne({ email }).select("+password")
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (isPasswordCorrect) {
            return res.status(404).json({
                success: false,
                message: "New password should be unique!"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();
        res.json({
            success: true,
            message: "Password is updated!"
        })
    }
    catch (e) {
        console.log(e);
    }
}