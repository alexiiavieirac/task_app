// backend/controllers/userController.js
const { query } = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  // Validação básica dos campos
  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios." });
  }

  try {
    // Verifica se o email já está cadastrado
    const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
    const [users] = await query(checkEmailQuery, [email]);

    if (users.length > 0) {
      return res.status(400).json({ message: "Email já cadastrado." });
    }

    // Cria o hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insere o novo usuário no banco de dados
    const insertQuery = "INSERT INTO users (email, password) VALUES (?, ?)";
    const [result] = await query(insertQuery, [email, hashedPassword]);

    // Gera o token JWT
    const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Retorna o token e o usuário
    res.status(201).json({ token, user: { id: result.insertId, email } });
  } catch (err) {
    console.error("Erro no registro: ", err);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
};

module.exports = { registerUser };