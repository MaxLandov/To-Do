document.addEventListener('DOMContentLoaded', (event) => {
    loadTasks();
});

function addTask() {
    let taskInput = document.getElementById('task-input');
    let taskText = taskInput.value.trim();

    if (taskText !== "") {
        let taskList = document.getElementById('task-list');
        let taskItem = document.createElement('li');
        taskItem.innerHTML = `${taskText} <button onclick="removeTask(this)">Remove</button>`;
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

function saveTasks() {
    let taskList = document.getElementById('task-list');
    let tasks = [];
    for (let i = 0; i < taskList.children.length; i++) {
        tasks.push(taskList.children[i].innerText.replace(" Remove", ""));
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        let taskList = document.getElementById('task-list');
        for (let task of tasks) {
            let taskItem = document.createElement('li');
            taskItem.innerHTML = `${task} <button onclick="removeTask(this)">Remove</button>`;
            taskList.appendChild(taskItem);
        }
    }
}
