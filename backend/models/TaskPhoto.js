const db = require('../database/db');

const TaskPhoto = {
    addPhoto: async (taskId, photoUrl) => {
        const query = 'INSERT INTO task_photos (task_id, photo_url) VALUES (?, ?)';
        await db.execute(query, [taskId, photoUrl]);
    },

    getPhotoByTask: async (taskId) => {
        const query = 'SELECT * FROM task_photos WHERE task_id = ?';
        const [rows] = await db.execute(query, [taskId]);
        return rows;
    },
};  

module.exports = TaskPhoto;