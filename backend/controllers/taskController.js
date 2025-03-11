// Definir funções para adicionar, atualizar, remover e listar tarefas
// Importar o modelo de tarefa
const db = require('../models/taskModel');

// Cria uma nova tarefa
exports.createTask = (req, res) => {
    const { title, points } = req.body;
    const query = 'INSERT INTO tasks (title, points, completed) VALUES (?, ?, ?)';
    db.query(query, [title, points, false], (err, result) => {
        if (err) throw err;
        res.status(200).json({ message: 'Tarefa criada com sucesso.' }); 
    });
};

// Atualiza uma tarefa
exports.updateTask = (req, res) => {
    const { id } = req.params;
    const { completed, imageUrl } = req.body;
    const query = 'UPDATE tasks SET completed = ?, imageUrl = ? WHERE id = ?';
    db.query(query, [completed, imageUrl, id], (err, result) => {
        if (err) throw err;
        res.status(200).json({ message: 'Tarefa atualiazada com sucesso.' });
    });
};

// Remove uma tarefa 
exports.getTask = (req, res) => {
    const query = 'SELECT * FROM tasks';
    db.query(query, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    }); 
};