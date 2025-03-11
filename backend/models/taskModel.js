// Gerencia a conexão com o banco de dados
const mysql = require('mysql'); 

// Cria a conexão com o banco de dados
const bd = mysql.createConnection({ 
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE
});

modeule.exports = bd;