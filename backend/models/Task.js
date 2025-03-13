const db = require('../database/db');

const Task = {
    create: async (userId, title, description, pontos) => {
        const query = 'INSERT INTO tasks (user_id, title, description, pontos) VALUES (?, ?, ?, ?)';
        const [result] = await db.execute(query, [userId, title, description, pontos]);
        return result.insertId;
    },

    getAll: async () => {
        const query = 'SELECT * FROM tasks';
        const [rows] = await db.execute(query);
        return rows;
    },

    getById: async (id) => {
        const query = 'SELECT * FROM tasks WHERE id = ?';
        const [rows] = await db.execute(query, [id]);
        return rows[0];
    },

    markAsCompleted: async (taskId, userId, fotoUrl) => {
        const query = 'INSERT INTO completed_tasks (taskId, userId, fotoUrl) VALUES (?, ?, ?)';
        await db.execute(query, [taskId, userId, fotoUrl]);
    }
};

module.exports = Task;