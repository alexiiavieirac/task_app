const jwt = require("jsonwebtoken");

// Middleware para verificar o token JWT
const authMiddleware = (req, res, next) => {
  // Obtém o token do cabeçalho da requisição
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // Verifica se o token foi enviado
  if (!token) {
    return res.status(401).json({ message: "Token não informado." });
  }

  try {
    // Verifica se o token é válido
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Adiciona o ID do usuário decodificado à requisição
    req.userId = decoded.id;

    // Passa para o próximo middleware ou rota
    next();
  } catch (err) {
    console.error("Erro na verificação do token: ", err);
    return res.status(401).json({ message: "Token inválido." });
  }
};

module.exports = authMiddleware;