const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

const fetchTasks = async () => {
  const response = await fetch('/tasks');
  const tasks = await response.json();
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `
      <span>${task.task}</span>
      <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(li);
  });
};

const addTask = async (e) => {
  e.preventDefault();
  const task = taskInput.value.trim();
  if (task) {
    await fetch('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task })
    });
    taskInput.value = '';
    fetchTasks();
  }
};

taskForm.addEventListener('submit', addTask);

const deleteTask = async (id) => {
  await fetch(`/tasks/${id}`, {
    method: 'DELETE'
  });
  fetchTasks();
};

document.addEventListener('DOMContentLoaded', fetchTasks);
