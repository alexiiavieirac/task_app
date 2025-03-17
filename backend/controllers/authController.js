const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { query } = require("../../database/db");

// Função para registrar um novo usuário
const register = async (req, res) => {
  const { email, password } = req.body;

  // Validação básica dos campos
  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios." });
  }

  try {
    // Verifica se o email já está cadastrado
    const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
    const users = await query(checkEmailQuery, [email]);

    if (users.length > 0) {
      return res.status(400).json({ message: "Email já cadastrado." });
    }

    // Cria o hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insere o novo usuário no banco de dados
    const insertQuery = "INSERT INTO users (email, password) VALUES (?, ?)";
    await query(insertQuery, [email, hashedPassword]);

    return res.status(201).json({ message: "Usuário cadastrado com sucesso." });
  } catch (err) {
    console.error("Erro no registro: ", err);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
};

// Função para fazer login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validação básica dos campos
  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios." });
  }

  try {
    // Verifica se o usuário existe
    const checkUserQuery = "SELECT * FROM users WHERE email = ?";
    const users = await query(checkUserQuery, [email]);

    if (users.length === 0) {
      return res.status(400).json({ message: "Email ou senha incorretos." });
    }

    const user = users[0];

    // Verifica se a senha está correta
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email ou senha incorretos." });
    }

    // Gera o token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ token });
  } catch (err) {
    console.error("Erro no login: ", err);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
};

// Função para verificar o token JWT
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Token não informado." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error("Erro na verificação do token: ", err);
    return res.status(401).json({ message: "Token inválido." });
  }
};

// Exportação das funções
module.exports = {
  register,
  loginUser,
  verifyToken,
};