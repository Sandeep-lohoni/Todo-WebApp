const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function createTaskElement(task, index) {
  const li = document.createElement("li");
  li.className = task.completed ? "checked" : "";

  const textSpan = document.createElement("span");
  textSpan.textContent = task.text;
  li.appendChild(textSpan);

  // Timestamp 
  const timeSpan = document.createElement("small");
  timeSpan.style.marginLeft = "10px";
  timeSpan.style.fontSize = "12px";
  timeSpan.style.color = "gray";
  timeSpan.textContent = task.timestamp;
  li.appendChild(timeSpan);

  // Buttons container
  const buttons = document.createElement("div");
  buttons.style.float = "right";

  // Edit button
  const editBtn = document.createElement("button");
  editBtn.textContent = "✎";
  editBtn.style.marginRight = "5px";
  editBtn.onclick = () => editTask(index);
  buttons.appendChild(editBtn);

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.textContent = "×";
  delBtn.onclick = () => deleteTask(index);
  buttons.appendChild(delBtn);

  li.appendChild(buttons);
  listContainer.appendChild(li);
}

function renderTasks() {
  listContainer.innerHTML = "";
  tasks.forEach((task, index) => {
    createTaskElement(task, index);
  });
}

function addTask() {
  const text = inputBox.value.trim();
  if (text === "") {
    alert("Please enter a task");
    return;
  }

  const newTask = {
    text: text,
    completed: false,
    timestamp: new Date().toLocaleString(),
  };

  tasks.push(newTask);
  inputBox.value = "";
  saveData();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveData();
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    saveData();
    renderTasks();
  }
}

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "SPAN" || e.target.tagName === "BUTTON") return;

  const li = e.target.closest("li");
  if (!li) return;

  const index = Array.from(listContainer.children).indexOf(li);
  tasks[index].completed = !tasks[index].completed;
  saveData();
  renderTasks();
});

function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTasks() {
  renderTasks();
}

showTasks();
