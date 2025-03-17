const { query } = require("../../database/db");

const TaskPhoto = {
  // Adiciona uma foto à tarefa
  addPhoto: async (taskId, photoUrl) => {
    // Validação básica dos campos
    if (!taskId || !photoUrl) {
      throw new Error("taskId e photoUrl são obrigatórios.");
    }

    try {
      const insertQuery =
        "INSERT INTO task_photos (task_id, photo_url) VALUES (?, ?)";
      await query(insertQuery, [taskId, photoUrl]);
    } catch (err) {
      console.error("Erro ao adicionar foto: ", err);
      throw new Error("Erro no servidor ao adicionar foto.");
    }
  },

  // Obtém as fotos de uma tarefa
  getPhotoByTask: async (taskId) => {
    // Validação básica dos campos
    if (!taskId) {
      throw new Error("taskId é obrigatório.");
    }

    try {
      const selectQuery = "SELECT * FROM task_photos WHERE task_id = ?";
      const [rows] = await query(selectQuery, [taskId]);
      return rows;
    } catch (err) {
      console.error("Erro ao buscar fotos da tarefa: ", err);
      throw new Error("Erro no servidor ao buscar fotos da tarefa.");
    }
  },
};

module.exports = TaskPhoto;