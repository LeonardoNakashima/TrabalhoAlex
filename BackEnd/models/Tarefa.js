const mongoose = require('mongoose');

const TarefaSchema = new mongoose.Schema({
  id: Date.now(),
  titulo: String,
  descricao: String,
  concluida: Boolean
});

module.exports = mongoose.model('Tarefa', TarefaSchema);
