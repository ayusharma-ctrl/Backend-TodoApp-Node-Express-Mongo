import express from 'express'
import { createTask, deleteTask, getAllTasks, updateTask } from '../controllers/task.js';
import { isAuthenticated } from '../middlewares/auth.js';

//creating a router
const router = express.Router();

//api to create a new task
router.post('/new', isAuthenticated, createTask)
//api to get all the tasks
router.get('/all', isAuthenticated, getAllTasks)
//apis to update & delete a task by it's id, that's why id is dynamic
router.route("/:id").put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask)


export default router;