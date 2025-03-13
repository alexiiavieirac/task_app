const db = require('assets/database/db');

const UserPoints = {
    addPoints: async (userId, points) => {
        const query = 'INSERT INTO user_points (userId, points) VALUES (?, ?)';
        await db.execute(query, [userId, points]);
    },

    getRanking: async () => {
        const query = `
            SELECT user_id, SUM(points) as total_points
            FROM user_points
            GROUP BY user_id
            ORDER BY total_points DESC
        `;

        const [rows] = await db.execute(query);
        return rows;
    }
};

module.exports = UserPoints;