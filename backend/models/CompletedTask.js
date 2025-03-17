const { query } = require("../../database/db");

const CompletedTask = {
  // Adiciona uma tarefa concluída
  add: async (userId, taskId, fotoUrl) => {
    // Validação básica dos campos
    if (!userId || !taskId || !fotoUrl) {
      throw new Error("userId, taskId e fotoUrl são obrigatórios.");
    }

    try {
      const insertQuery =
        "INSERT INTO completed_tasks (userId, taskId, fotoUrl) VALUES (?, ?, ?)";
      await query(insertQuery, [userId, taskId, fotoUrl]);
    } catch (err) {
      console.error("Erro ao adicionar tarefa concluída: ", err);
      throw new Error("Erro no servidor ao adicionar tarefa concluída.");
    }
  },

  // Obtém todas as tarefas concluídas
  getAll: async () => {
    try {
      const selectQuery = "SELECT * FROM completed_tasks";
      const [rows] = await query(selectQuery);
      return rows;
    } catch (err) {
      console.error("Erro ao buscar tarefas concluídas: ", err);
      throw new Error("Erro no servidor ao buscar tarefas concluídas.");
    }
  },
};

module.exports = CompletedTask;