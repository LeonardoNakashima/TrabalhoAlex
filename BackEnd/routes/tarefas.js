const express = require('express');
const router = express.Router();
const Tarefa = require('../models/Tarefa');

router.post('/', async (req, res) => {
  try {
    const novaTarefa = new Tarefa(req.body);
    await novaTarefa.save();
    res.status(201).json(novaTarefa);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao salvar tarefa.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const tarefas = await Tarefa.find();
    res.json(tarefas);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar tarefas.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tarefa = await Tarefa.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      { concluida: req.body.concluida },
      { new: true }
    );
    res.json(tarefa);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar tarefa.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Tarefa.deleteOne({ id: parseInt(req.params.id) });
    res.json({ mensagem: 'Tarefa excluída com sucesso.' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao excluir tarefa.' });
  }
});

module.exports = router;
