const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware"); // Importa o middleware de autenticação

// Rota para obter todos os usuários (se necessário)
router.get("/", userController.getUser);

// Rota para registrar um novo usuário
router.post("/register", userController.registerUser);

// Rota para fazer login
router.post("/login", userController.loginUser);

// Rota para obter o perfil do usuário (protegida por autenticação)
router.get("/me", authMiddleware, userController.getUserProfile);

module.exports = router;