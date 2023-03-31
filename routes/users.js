import express from 'express';
import { addNewUser, deleteUser, getAllUsers, getMyProfile, login, logout, updatePassword } from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/auth.js';

//creating a router
const router = express.Router();

//api to get all the users data
router.get("/all", getAllUsers)

//api to create new user
router.post("/new", addNewUser)

//api to login
router.post("/login", login)

//api to logout
router.get("/logout", logout)

//api to get user's profile
router.get("/me", isAuthenticated, getMyProfile)

//api to update user's password
router.put("/updatePassword", isAuthenticated, updatePassword)

//api to get data of a particular user by sending it's ID dynamically
router.delete("/delete/:id", deleteUser)


export default router;