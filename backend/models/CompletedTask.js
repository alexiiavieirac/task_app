const db = require('../database/db');

const CompletedTask = { 
    add: async (userId, taskId, fotoUrl) => {
        const query = 'INSERT INTO completed_tasks (userId, taskId, fotoUrl) VALUES (?, ?, ?)';
        await db.execute(query, [userId, taskId, fotoUrl]);
    },

    getAll: async () => {
        const query = 'SELECT * FROM completed_tasks';
        const [rows] = await db.execute(query);
        return rows;
    }
};

module.exports = CompletedTask;