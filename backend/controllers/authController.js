const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Importa o modelo de usuário

// Função para registrar um novo usuário
const register = async (req, res) => {
  const { email, password } = req.body;

  // Validação básica dos campos
  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios." });
  }

  try {
    // Verifica se o email já está cadastrado
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email já cadastrado." });
    }

    // Cria o hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insere o novo usuário no banco de dados
    const userId = await User.create(email, hashedPassword);

    // Gera o token JWT
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(201).json({ message: "Usuário cadastrado com sucesso.", token, user: { id: userId, email } });
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
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Email ou senha incorretos." });
    }

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