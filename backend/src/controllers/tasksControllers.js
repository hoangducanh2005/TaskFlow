import { createDeflate } from 'zlib';
import Task from '../models/Tasks.js';


export const getAllTasks = async (req, res) => {
    try {
        const { filter } = req.query;
        let query = {};
        
        if (filter) {
            const now = new Date();
            if (filter === 'today') {
                const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                query.createdAt = { $gte: startOfToday };
            } else if (filter === 'week') {
                const startOfWeek = new Date(now);
                startOfWeek.setDate(now.getDate() - now.getDay());
                startOfWeek.setHours(0, 0, 0, 0);
                query.createdAt = { $gte: startOfWeek };
            } else if (filter === 'month') {
                const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                query.createdAt = { $gte: startOfMonth };
            }
        }

        const tasks = await Task.find(query).sort({ createdAt: -1 });    // lay tat ca data tu database // -1 = descending order, 1 = ascending order
        
        const activeCount = tasks.filter(task => task.status === 'active').length;
        const completeCount = tasks.filter(task => task.status === 'completed').length;

        res.status(200).json({
            tasks,
            activeCount,
            completeCount
        });

    } catch (error) {
        console.error('Error when calling getAllTasks:', error);
        res.status(500).json({ message: 'System Error' });
    }
};

export const createTask = async (req, res) => {
    try {
        const { title } = req.body;
        const task = new Task({ title });

        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error when calling createTask:', error);
        res.status(500).json({ message: 'System Error' });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { title, status, completedAt } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { title, status, completedAt },
            { returnDocument: 'after' } // Trả về document sau khi update
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task does not exist' });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Error when calling updateTask:', error);
        res.status(500).json({ message: 'System Error' });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task does not exist' });
        }

        res.status(200).json(deletedTask  );
    } catch (error) {
        console.error('Error when calling deleteTask:', error);
        res.status(500).json({ message: 'System Error' });
    }
};
