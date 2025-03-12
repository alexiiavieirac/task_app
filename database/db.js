const mysql2 = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql2.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}); 

export const query = async (sql, params) => {
    try {
        const [result] = await pool.execute(sql, params);
        return result;
    } catch (err) {
        console.error("Erro na consulta do banco de dados: ", error);
        throw error;
    }
};

export default pool;
