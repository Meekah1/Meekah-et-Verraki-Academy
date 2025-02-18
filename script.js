// DOM Elements
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// Load tasks from Local Storage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Add Task
addTaskBtn.addEventListener("click", addTask);

// Function to add a task
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  // Create task item
  const taskItem = document.createElement("li");
  taskItem.innerHTML = `
    <span>${taskText}</span>
    <div class="task-actions">
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </div>
  `;

  // Add event listeners for edit and delete buttons
  const editBtn = taskItem.querySelector(".edit-btn");
  const deleteBtn = taskItem.querySelector(".delete-btn");

  editBtn.addEventListener("click", () => editTask(taskItem, taskText));
  deleteBtn.addEventListener("click", () => deleteTask(taskItem));

  // Append task to the list
  taskList.appendChild(taskItem);

  // Save tasks to Local Storage
  saveTasks();

  // Clear input field
  taskInput.value = "";
}

// Function to edit a task
function editTask(taskItem, oldText) {
  const newText = prompt("Edit your task:", oldText);

  if (newText !== null && newText.trim() !== "") {
    taskItem.querySelector("span").textContent = newText.trim();
    saveTasks();
  }
}

// Function to delete a task
function deleteTask(taskItem) {
  if (confirm("Are you sure you want to delete this task?")) {
    taskItem.remove();
    saveTasks();
  }
}

// Function to save tasks to Local Storage
function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach((taskItem) => {
    tasks.push(taskItem.querySelector("span").textContent);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from Local Storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((taskText) => {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
      <span>${taskText}</span>
      <div class="task-actions">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    const editBtn = taskItem.querySelector(".edit-btn");
    const deleteBtn = taskItem.querySelector(".delete-btn");

    editBtn.addEventListener("click", () => editTask(taskItem, taskText));
    deleteBtn.addEventListener("click", () => deleteTask(taskItem));

    taskList.appendChild(taskItem);
  });
}
