const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', taskRoutes);
app.use(express.json());
app.use('/users', userRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});