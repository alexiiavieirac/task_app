const { query } = require("../../database/db");

const UserPoints = {
  // Adiciona pontos a um usuário
  addPoints: async (userId, points) => {
    // Validação básica dos campos
    if (!userId || !points) {
      throw new Error("userId e points são obrigatórios.");
    }

    try {
      const insertQuery = "INSERT INTO user_points (userId, points) VALUES (?, ?)";
      await query(insertQuery, [userId, points]);
    } catch (err) {
      console.error("Erro ao adicionar pontos: ", err);
      throw new Error("Erro no servidor ao adicionar pontos.");
    }
  },

  // Obtém o ranking de usuários
  getRanking: async () => {
    try {
      const selectQuery = `
        SELECT user_id, SUM(points) as total_points
        FROM user_points
        GROUP BY user_id
        ORDER BY total_points DESC
      `;

      const [rows] = await query(selectQuery);
      return rows;
    } catch (err) {
      console.error("Erro ao buscar ranking: ", err);
      throw new Error("Erro no servidor ao buscar ranking.");
    }
  },
};

module.exports = UserPoints;