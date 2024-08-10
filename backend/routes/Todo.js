const express = require('express');
const router = express.Router();
const Todo = require('../model/addTodo');

router.use(express.json());

router.post('/add', async (req, res) => {
  const { description, status } = req.body;
  try {
    const newTodo = new Todo({
      description,
      status,
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/get', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { status: 'completed' }, { new: true });
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
