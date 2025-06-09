const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const tarefasRoutes = require('./routes/tarefas');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/tarefas', tarefasRoutes);

// Conexão MongoDB
mongoose.connect('mongodb://localhost:27017/tarefas', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado ao MongoDB');
  app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
}).catch(err => console.error('Erro ao conectar no MongoDB:', err));
