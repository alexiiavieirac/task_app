const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes'); // Corrigido para authRoutes
const app = express();

app.use(cors({ origin: 'http://localhost:3000' })); // Configura o CORS
app.use(bodyParser.json());
app.use(express.json());

app.use('/api', taskRoutes);
app.use('/auth', authRoutes); // Corrigido para authRoutes

// Serve arquivos estáticos da pasta "frontend/public"
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Rota de fallback para o index.html (suporta roteamento no lado do cliente)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});