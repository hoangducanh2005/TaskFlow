import express from 'express';
import { 
    createTask, 
    deleteTask, 
    getAllTasks, 
    updateTask,
    reorderTasks
} 
from '../controllers/tasksControllers.js';

const router = express.Router();

router.get('/', getAllTasks);

router.post('/', createTask);

router.put('/reorder', reorderTasks);

router.put('/:id', updateTask);

router.delete('/:id', deleteTask);

export default router;
