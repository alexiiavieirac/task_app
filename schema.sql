CREATE DATABASE IF NOT EXISTS task_app;

USE task_app;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    pontos INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS tarefas_concluidas (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES users(id),
    tarefa_id INT REFERENCES tasks(id),
    foto_url TEXT,
    data_conclusao TIMESTAMP DEFAULT NOW()
);