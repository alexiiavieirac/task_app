const { query } = require("../../database/db");

const User = {
  // Cria um novo usuário
  create: async (email, password) => {
    // Validação básica dos campos
    if (!email || !password) {
      throw new Error("Email e senha são obrigatórios.");
    }

    try {
      const insertQuery = "INSERT INTO users (email, password) VALUES (?, ?)";
      const [result] = await query(insertQuery, [email, password]);
      return result.insertId;
    } catch (err) {
      console.error("Erro ao criar usuário: ", err);
      throw new Error("Erro no servidor ao criar usuário.");
    }
  },

  // Busca um usuário pelo email
  findByEmail: async (email) => {
    // Validação básica dos campos
    if (!email) {
      throw new Error("Email é obrigatório.");
    }

    try {
      const selectQuery = "SELECT * FROM users WHERE email = ?";
      const [rows] = await query(selectQuery, [email]);

      if (rows.length === 0) {
        throw new Error("Usuário não encontrado.");
      }

      return rows[0];
    } catch (err) {
      console.error("Erro ao buscar usuário por email: ", err);
      throw new Error("Erro no servidor ao buscar usuário por email.");
    }
  },

  // Busca um usuário pelo ID
  findById: async (id) => {
    // Validação básica dos campos
    if (!id) {
      throw new Error("ID do usuário é obrigatório.");
    }

    try {
      const selectQuery = "SELECT * FROM users WHERE id = ?";
      const [rows] = await query(selectQuery, [id]);

      if (rows.length === 0) {
        throw new Error("Usuário não encontrado.");
      }

      return rows[0];
    } catch (err) {
      console.error("Erro ao buscar usuário por ID: ", err);
      throw new Error("Erro no servidor ao buscar usuário por ID.");
    }
  },
};

module.exports = User;