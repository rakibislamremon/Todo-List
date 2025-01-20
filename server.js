const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let tasks = [];

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { task } = req.body;
  if (task) {
    tasks.push({ id: tasks.length + 1, task, completed: false });
    res.status(201).json({ message: 'Task added successfully' });
  } else {
    res.status(400).json({ message: 'Task content cannot be empty' });
  }
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== taskId);
  res.json({ message: 'Task deleted successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
