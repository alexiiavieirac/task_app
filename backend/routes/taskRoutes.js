const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware"); // Importe o middleware de autenticação, se necessário

// Rota para criar uma nova tarefa (protegida por autenticação, se necessário)
router.post("/tasks", authMiddleware, taskController.createTask);

// Rota para atualizar uma tarefa (protegida por autenticação, se necessário)
router.put("/tasks/:id", authMiddleware, taskController.updateTask);

// Rota para listar todas as tarefas
router.get("/tasks", taskController.getAllTasks);

module.exports = router;