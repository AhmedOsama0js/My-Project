let inputAdd = document.querySelector("#input-add");
let btnAdd = document.querySelector(".btn-add");
let bodyTask = document.querySelector(".body");
let box = document.querySelector(".box");
let done = document.querySelector(".done");
let del = document.querySelector(".del");

let id = 0;

console.log(bodyTask.childNodes);

let arrOfTask = [];

bodyTask.addEventListener("click", doneAndDel);
if (localStorage.getItem("task")) {
  arrOfTask = JSON.parse(localStorage.getItem("task"));
}

gitTaskFromLocal();

btnAdd.addEventListener("click", () => {
  if (inputAdd.value.trim() === "") return;
  bodyTask.innerHTML = "";
  addTaskOfArray();
  addTask();
  addTaskOfLocalStorage(arrOfTask);
});

function addTaskOfArray() {
  const task = {
    id: `${id++}+${new Date().getSeconds()}`,
    title: `${inputAdd.value}`,
    done: false,
  };
  arrOfTask.push(task);
}

function addTask() {
  arrOfTask.forEach((e) => {
    let box = document.createElement("div");
    box.classList.add("box");

    if (e.done == true) {
      box.classList.add("is-done");
    }

    box.id = e.id;
    let p = document.createElement("p");
    p.innerHTML = e.title;
    let icons = document.createElement("span");
    icons.classList.add("icons");
    let done = document.createElement("span");
    done.classList.add("done");
    done.innerHTML = `<i class="fa-solid fa-check"></i>`;
    let del = document.createElement("span");
    del.classList.add("del");
    del.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    icons.appendChild(done);
    icons.appendChild(del);
    box.appendChild(p);
    box.appendChild(icons);
    bodyTask.appendChild(box);
    inputAdd.value = "";
  });
}

function doneAndDel(e) {
  let item = e.target;
  let todo = item.parentElement.parentElement;

  if (item.classList[0] === "done") {
    todo.classList.toggle("is-done");
    toggleDone(todo.id);
  }

  if (item.classList[0] === "del") {
    todo.classList.toggle("deleted");
    todo.addEventListener("transitionend", () => {
      todo.remove();
      deleteWithLocal(todo.id);
    });
  }
}

function addTaskOfLocalStorage(arrOfTask) {
  window.localStorage.setItem("task", JSON.stringify(arrOfTask));
}

function gitTaskFromLocal() {
  let data = window.localStorage.getItem("task");
  if (data) {
    let tasks = JSON.parse(data);
    addTask(tasks);
  }
}

function deleteWithLocal(taskId) {
  arrOfTask = arrOfTask.filter((task) => task.id != taskId);
  addTaskOfLocalStorage(arrOfTask);
}

function toggleDone(taskID) {
  for (let i = 0; i < arrOfTask.length; i++) {
    if (arrOfTask[i].id === taskID) {
      arrOfTask[i].done = !arrOfTask[i].done;
    }
  }
  addTaskOfLocalStorage(arrOfTask);
}
