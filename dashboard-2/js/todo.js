let boxes = document.querySelectorAll(".boxes-container .box");
let tasks = document.querySelectorAll(".boxes-container .box .itme");


tasks.forEach((task) => {
  task.addEventListener("dragstart", () => {
    task.classList.add("is-drag");
  });
  task.addEventListener("dragend", () => {
    task.classList.remove("is-drag");
  });

  task.addEventListener("touchstart", () => {
    task.classList.add("is-drag");
  });
    task.addEventListener("touchend", () => {
      task.classList.remove("is-drag");
    });
});

boxes.forEach((box) => {
  
  box.addEventListener("dragover", (el) => {
    el.preventDefault();

    const addTask = document.querySelector(".is-drag");
    box.appendChild(addTask);
  });
  box.addEventListener("touchmove", (el) => {
    el.preventDefault();

    const addTask = document.querySelector(".is-drag");
    box.appendChild(addTask);
  });
});


let input = document.querySelector(".input-group input");
let btn = document.querySelector(".input-group button");

btn.addEventListener("click", () => {
  let inputText = input.value;
  if (!inputText) {
    return;
  } else {

    let newTask = document.createElement("p")
    newTask.classList.add("itme")


    let span = document.createElement("span")
    span.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    newTask.setAttribute("draggable", "true")
    newTask.innerHTML = inputText
    newTask.appendChild(span)
  newTask.addEventListener("dragstart", () => {
    newTask.classList.add("is-drag");
  });
  newTask.addEventListener("dragend", () => {
    newTask.classList.remove("is-drag");
  });
  newTask.addEventListener("touchstart", () => {
    newTask.classList.add("is-drag");
  });
  newTask.addEventListener("touchend", () => {
    newTask.classList.remove("is-drag");
  });
    
    boxes[0].appendChild(newTask)

    input.value = ""
  }

  let x = document.querySelectorAll(".boxes-container .box .itme span");
deleteElement(x);
})

let x = document.querySelectorAll(".boxes-container .box .itme span");
  deleteElement(x);



function deleteElement(x) {
  x.forEach((el) => {
    el.addEventListener("click", () => {
      el.parentElement.classList.add("deleted-element");
      el.parentElement.addEventListener("transitionend", () => {
        el.parentElement.remove();
      });
    });
  });
}
