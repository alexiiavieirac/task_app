const { query } = require('../../database/db');

const getRanking = async (req, res) => {
    try {
        const rankingQuery = `
            SELECT u.id, u.email, SUM(up.pontos) AS total_pontos
            FROM users u
            LEFT JOIN user_pontos up ON u.id = up.user_id
            GROUP BY u.id
            ORDER BY total_pontos DESC
            LIMIT 10; 
        `;  
    
        const [ranking] = await query(rankingQuery);

        if (ranking.length === 0) {
            return res.status(404).json({ message: 'Nenhum usuário encontrado no ranking.' });
        }

        return res.status(200).json(ranking);
    } catch (err) {
        console.log('Erro ao buscar ranking', err);
        return res.status(500).json({ message: 'Erro no servidor ao obter o ranking.' });
    };  
};

const addPoints = async (req, res) => {
    const { userId, taskId, pontos, motivo } = req.body;

    if (!userId || !taskId || !pontos || !motivo) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    try {
        const insertQuery = `
            INSERT INTO user_points (user_id, task_id, pontos, motivo)
            VALUES (?, ?, ?, ?)
        `;
    
        await query(insertQuery, [userId, taskId, pontos, motivo]);

        return res.status(201).json({ message: 'Pontos adicionados com sucesso.' });
    } catch (err) {
        console.log('Erro ao adicionar pontos', err);
        return res.status(500).json({ message: 'Erro no servidor ao adicionar pontos.' });
    };
};

module.exports = {
    getRanking,
    addPoints
};