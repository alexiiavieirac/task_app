const db = require('../database/db');

const User = {
    create: async (email, password) => {
        const query = 'INSER INTO users (email, password) VALUES (?, ?)';
        const [result] = await db.execute(query, [email, password]);
        return result.insertId;
    },

    findByEmail: async (email) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        const [result] = await db.execute(query, [email]);
        return rows[0];
    },

    findById: async (id) => {
        const query = 'SELECT * FROM users WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return rows[0];
    }
};

module.exports = User;