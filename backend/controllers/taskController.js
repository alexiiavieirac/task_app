// Importar o modelo de tarefa
const db = require("../models/taskModel");

// Cria uma nova tarefa
exports.createTask = (req, res) => {
  const { title, points } = req.body;

  // Validação básica dos campos
  if (!title || !points) {
    return res.status(400).json({ message: "Título e pontos são obrigatórios." });
  }

  const query = "INSERT INTO tasks (title, points, completed) VALUES (?, ?, ?)";
  db.query(query, [title, points, false], (err, result) => {
    if (err) {
      console.error("Erro ao criar tarefa: ", err);
      return res.status(500).json({ message: "Erro no servidor ao criar tarefa." });
    }
    res.status(201).json({ message: "Tarefa criada com sucesso." });
  });
};

// Atualiza uma tarefa
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { completed, imageUrl } = req.body;

  // Validação básica dos campos
  if (completed === undefined || !imageUrl) {
    return res.status(400).json({ message: "Campos 'completed' e 'imageUrl' são obrigatórios." });
  }

  const query = "UPDATE tasks SET completed = ?, imageUrl = ? WHERE id = ?";
  db.query(query, [completed, imageUrl, id], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar tarefa: ", err);
      return res.status(500).json({ message: "Erro no servidor ao atualizar tarefa." });
    }
    res.status(200).json({ message: "Tarefa atualizada com sucesso." });
  });
};

// Lista todas as tarefas
exports.getAllTasks = (req, res) => {
  const query = "SELECT * FROM tasks";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Erro ao buscar tarefas: ", err);
      return res.status(500).json({ message: "Erro no servidor ao buscar tarefas." });
    }
    res.status(200).json(result);
  });
};

// Remove uma tarefa
exports.deleteTask = (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM tasks WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Erro ao remover tarefa: ", err);
      return res.status(500).json({ message: "Erro no servidor ao remover tarefa." });
    }
    res.status(200).json({ message: "Tarefa removida com sucesso." });
  });
};