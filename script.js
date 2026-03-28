const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
let tasks = [];

function addTask() {
  if (inputBox.value === "") {
    alert("You Must Write Something!!!!");
  } else {
    let task = {
      text: inputBox.value,
      checked: false,
    };
    tasks.push(task);
    inputBox.value = "";
    renderTasks();
    saveTasks();
  }
}

function renderTasks() {
  listContainer.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    let li = document.createElement("li");
    li.textContent = tasks[i].text;
    li.setAttribute("data-index", i);

    if (tasks[i].checked) {
      li.classList.add("checked");
    }

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    listContainer.appendChild(li);
  }
}

listContainer.addEventListener("click", function (e) {
  let index = e.target.getAttribute("data-index");

  if (e.target.tagName === "LI") {
    tasks[index].checked = !tasks[index].checked;
    renderTasks();
    saveTasks();
  } else if (e.target.tagName === "SPAN") {
    tasks.splice(index, 1);
    renderTasks();
    saveTasks();
  }
});

function saveTasks() {
  localStorage.setItem("data", JSON.stringify(tasks));
}

function loadTasks() {
  let stored = localStorage.getItem("data");
  tasks = stored ? JSON.parse(stored) : [];
  renderTasks();
}

loadTasks();
