import Task from "../models/task.js";
import asyncHandler from "express-async-handler"
import { checkEmptyObject, filterObj } from "../utils/filterObject.js";


export const createTask = asyncHandler(async (req,res,next) =>{
    console.log(req)
    const {title,description} = req.body;

    const newTask = await Task.create({
        title,
        description,
    })
    if (!newTask) 
         throw new Error('Error creating new task')
    return res.status(200).json(newTask);     
})


export const getTask = asyncHandler(async (req,res,next)=>{
    const {id} = req.params;

    const task = await Task.find({_id:id});

    if(!task) throw new Error("No task found");

    return res.status(200).json(task);
});


export const deleteTask = asyncHandler(async (req,res,next)=>{
    const {id} = req.params;

    const task = await Task.findOneAndDelete({_id:id});

    if(!task) throw new Error("No task found");

    return res.status(200).json(task);
});

export const updateTask = asyncHandler(async(req,res,nex)=>{

    const {id} = req.params;

    const filteredBody = filterObj(req.body, 'title',"description");
    if(checkEmptyObject(filteredBody)) throw new Error('No updates found');

    const updatedTask =  await  Task.findOneAndUpdate({_id:id}, filteredBody, {
            new: true,
            runValidators: true
        });

    if(!updatedTask) throw new Error("Error updating task");

     return res.status(200).json(updatedTask);

})
