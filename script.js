document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById('todo-list');
    
    // Load saved tasks
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    if (savedTasks.length > 0) {
      document.querySelector('.empty-message')?.remove();
      savedTasks.forEach(task => addTaskToDOM(task.text, task.completed));
    }
    
    // Add new task
    const createNewTask = () => {
      const text = todoInput.value.trim();
      if (text) {
        document.querySelector('.empty-message')?.remove();
        addTaskToDOM(text);
        todoInput.value = '';
        todoInput.focus();
      }
    };
    
    // Event listeners
    addButton.addEventListener('click', createNewTask);
    todoInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') createNewTask();
    });
    
    // Add task to DOM
    function addTaskToDOM(text, completed = false) {
      const li = document.createElement('li');
      li.innerHTML = `
        <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''}>
        <span class="task-text ${completed ? 'completed' : ''}">${text}</span>
        <button class="delete-btn">Delete</button>
      `;
      
      // Add event listeners
      li.querySelector('.checkbox').addEventListener('change', e => {
        li.querySelector('.task-text').classList.toggle('completed', e.target.checked);
        saveTasks();
      });
      
      li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
        if (todoList.children.length === 0) {
          todoList.innerHTML = '<li class="empty-message">No tasks yet! Add one above.</li>';
        }
        saveTasks();
      });
      
      todoList.appendChild(li);
      saveTasks();
    }
    
    // Save tasks to localStorage
    function saveTasks() {
      const tasks = [];
      todoList.querySelectorAll('li:not(.empty-message)').forEach(li => {
        const taskText = li.querySelector('.task-text').textContent;
        const isCompleted = li.querySelector('.task-text').classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  });