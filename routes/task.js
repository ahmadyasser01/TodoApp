import express from 'express';
import { protect } from '../controllers/auth.js';
import { createTask, deleteTask, getAllTasks, getTask, updateTask } from '../controllers/task.js';

const router = express.Router();
router.use(protect)
router.route('/')
.post(createTask)
.get(getAllTasks)

router.route('/:id')
.get(getTask)
.patch(updateTask)
.delete(deleteTask);

export default router;