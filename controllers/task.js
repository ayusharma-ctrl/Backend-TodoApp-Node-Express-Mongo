import { Task } from "../models/task.js";


export const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        await Task.create({
            title,
            description,
            user: req.user
        })
        res.status(201).json({
            success: true,
            message: "Task created!"
        })
    }
    catch (e) {
        console.log(e);
    }
}


export const updateTask = async(req,res) => {
    try{
        const taskId = req.params.id;
        const task = await Task.findById(taskId);
        task.isCompleted = !task.isCompleted;
        await task.save();
        res.status(200).json({
            success:true,
            message:"Task is updated!"
        })
    }
    catch(e){
        console.log(e);
    }
}


export const getAllTasks = async (req, res) => {
    try {
        const userId = req.user._id;
        const tasks = await Task.find({ user: userId })
        res.status(200).json({
            success:true,
            tasks
        })
    }
    catch (e) {
        console.log(e);
    }
}


export const deleteTask = async(req,res) => {
    try{
        const taskId = req.params.id;
        const task = await Task.findById(taskId);
        if(!task){
            return res.status(404).json({
                success:false,
                message:"No such task Found!"
            })
        }
        await task.deleteOne()
        res.status(200).json({
            success:true,
            message:"Task Deleted!"
        })
    }
    catch(e){
        console.log(e);
    }
} 