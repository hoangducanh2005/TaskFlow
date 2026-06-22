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

        const tasks = await Task.find(query).sort({ order: 1, createdAt: -1 });    // lay tat ca data tu database
        
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
        
        const highestTask = await Task.findOne().sort('-order');
        const order = highestTask ? highestTask.order + 1 : 0;

        const task = new Task({ title, order });

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

export const reorderTasks = async (req, res) => {
    try {
        const { tasks } = req.body; // Array of { _id, order }
        
        if (!tasks || !Array.isArray(tasks)) {
            return res.status(400).json({ message: 'Invalid payload' });
        }

        // Bulk update
        const bulkOps = tasks.map(t => ({
            updateOne: {
                filter: { _id: t._id },
                update: { order: t.order }
            }
        }));

        await Task.bulkWrite(bulkOps);

        res.status(200).json({ message: 'Tasks reordered successfully' });
    } catch (error) {
        console.error('Error when calling reorderTasks:', error);
        res.status(500).json({ message: 'System Error' });
    }
};
