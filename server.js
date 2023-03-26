import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Task from './src/models/task.js';
import { mongoDbUser } from './MongoDb.js'

mongoose.connect(mongoDbUser, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(cors());
app.use(express.json());

// Rota para criar uma nova tarefa
app.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Rota para listar todas as tarefas
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Rota para obter uma tarefa pelo ID
app.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Rota para atualizar uma tarefa pelo ID
app.put('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Rota para excluir uma tarefa pelo ID
app.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
