document.addEventListener('DOMContentLoaded', (event) => {
    loadTasks();
});

function addTask() {
    let taskInput = document.getElementById('task-input');
    let taskText = taskInput.value.trim();

    if (taskText !== "") {
        let taskList = document.getElementById('task-list');
        let taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span onclick="toggleComplete(this)">${taskText}</span>
            <button onclick="removeTask(this)">Remove</button>
        `;
        taskList.appendChild(taskItem);

        saveTasks();
        taskInput.value = '';
    }
}

function removeTask(taskElement) {
    let taskItem = taskElement.parentElement;
    taskItem.remove();
    saveTasks();
}

function toggleComplete(taskElement) {
    let taskItem = taskElement.parentElement;
    taskItem.classList.toggle('completed');
    saveTasks();
}

function saveTasks() {
    let taskList = document.getElementById('task-list');
    let tasks = [];
    for (let i = 0; i < taskList.children.length; i++) {
        let taskItem = taskList.children[i];
        let task = {
            text: taskItem.children[0].innerText,
            completed: taskItem.classList.contains('completed')
        };
        tasks.push(task);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        let taskList = document.getElementById('task-list');
        for (let task of tasks) {
            let taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <span onclick="toggleComplete(this)">${task.text}</span>
                <button onclick="removeTask(this)">Remove</button>
            `;
            if (task.completed) {
                taskItem.classList.add('completed');
            }
            taskList.appendChild(taskItem);
        }
    }
}
