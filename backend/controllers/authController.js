const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { query } = require('../database/db');

export const register = async (req, res) => {
    const { email, password } = req.body;

    const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
    const users = await query(checkEmailQuery, [email]);

    if (users.length > 0) {
        return res.status(400).json({ message: 'Email já cadastrado.'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const insertQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
    await query(insertQuery, [email, hashedPassword]);

    return res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
    const users = await query(checkEmailQuery, [email]);

    if (users.length === 0) {
        return res.status(400).json({ message: 'Email ou senha incorretos.'});
    }

    const user = users[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Email ou senha incorretos.'});
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ token });
};

export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Token não informado.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido.' });
    }
};