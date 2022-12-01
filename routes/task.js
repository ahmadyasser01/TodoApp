import express from 'express';
import { createTask, deleteTask, getTask, updateTask } from '../controllers/task.js';


const router = express.Router();

router.route('/')
.post(createTask)

router.route('/:id')
.get(getTask)
.patch(updateTask)
.delete(deleteTask);

export default router;