const express = require("express");
const router = express.Router();
const rankingController = require("../controllers/rankingController");
const authMiddleware = require("../middleware/authMiddleware");

// Prefixo comum para todas as rotas de ranking
router.use("/api/ranking", router);

// Rota para obter o ranking
router.get("/", rankingController.getRanking);

// Rota para adicionar pontos (protegida por autenticação, se necessário)
router.post("/add-points", authMiddleware, rankingController.addPoints);

module.exports = router;