const { query } = require("../../database/db");

const Task = {
  // Cria uma nova tarefa
  create: async (userId, title, description, pontos) => {
    // Validação básica dos campos
    if (!userId || !title || !description || !pontos) {
      throw new Error("userId, title, description e pontos são obrigatórios.");
    }

    try {
      const insertQuery =
        "INSERT INTO tasks (user_id, title, description, pontos) VALUES (?, ?, ?, ?)";
      const [result] = await query(insertQuery, [userId, title, description, pontos]);
      return result.insertId;
    } catch (err) {
      console.error("Erro ao criar tarefa: ", err);
      throw new Error("Erro no servidor ao criar tarefa.");
    }
  },

  // Obtém todas as tarefas
  getAll: async () => {
    try {
      const selectQuery = "SELECT * FROM tasks";
      const [rows] = await query(selectQuery);
      return rows;
    } catch (err) {
      console.error("Erro ao buscar tarefas: ", err);
      throw new Error("Erro no servidor ao buscar tarefas.");
    }
  },

  // Obtém uma tarefa pelo ID
  getById: async (id) => {
    if (!id) {
      throw new Error("ID da tarefa é obrigatório.");
    }

    try {
      const selectQuery = "SELECT * FROM tasks WHERE id = ?";
      const [rows] = await query(selectQuery, [id]);

      if (rows.length === 0) {
        throw new Error("Tarefa não encontrada.");
      }

      return rows[0];
    } catch (err) {
      console.error("Erro ao buscar tarefa por ID: ", err);
      throw new Error("Erro no servidor ao buscar tarefa por ID.");
    }
  },

  // Marca uma tarefa como concluída
  markAsCompleted: async (taskId, userId, fotoUrl) => {
    // Validação básica dos campos
    if (!taskId || !userId || !fotoUrl) {
      throw new Error("taskId, userId e fotoUrl são obrigatórios.");
    }

    try {
      const insertQuery =
        "INSERT INTO completed_tasks (taskId, userId, fotoUrl) VALUES (?, ?, ?)";
      await query(insertQuery, [taskId, userId, fotoUrl]);
    } catch (err) {
      console.error("Erro ao marcar tarefa como concluída: ", err);
      throw new Error("Erro no servidor ao marcar tarefa como concluída.");
    }
  },
};

module.exports = Task;