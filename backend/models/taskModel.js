// Importa o pacote mysql2/promise para suporte a Promises
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Cria a conexão com o banco de dados
const bd = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Exporta a conexão
module.exports = bd;