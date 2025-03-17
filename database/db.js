const mysql2 = require("mysql2/promise");
const dotenv = require("dotenv");

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Validação das variáveis de ambiente
const requiredEnvVars = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Variável de ambiente ${envVar} não definida.`);
  }
}

// Configuração do pool de conexões
const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Log de sucesso ao criar o pool de conexões
console.log("Pool de conexões com o banco de dados criado com sucesso.");

// Função para executar consultas
const query = async (sql, params) => {
  try {
    const [result] = await pool.execute(sql, params);
    return result;
  } catch (err) {
    console.error("Erro na consulta do banco de dados: ", err);
    throw err;
  }
};

// Exportação
module.exports = {
  pool,
  query,
};