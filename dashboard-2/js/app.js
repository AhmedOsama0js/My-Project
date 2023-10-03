let sidebar = document.querySelector("#sidebar");
let brog = document.querySelector("#brog");
let borgI = document.querySelector("#brog i");

brog.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  if (borgI.classList[1] == "fa-bars") {
    borgI.className = "fa-solid fa-x";
  } else {
    borgI.className = "fa-solid fa-bars";
  }
});

let table = document.querySelector("table");
let mode = document.querySelector(".night");
let icon = document.querySelector(".night i");
let navbarDropdownMenu = document.querySelector("#navbar-dropdown-menu");

mode.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  table.classList.toggle("table-dark");

  navbarDropdownMenu.classList.toggle("dropdown-menu-dark");

  if (icon.classList[1] == "fa-moon") {
    icon.className = "fa-solid fa-sun";
  } else {
    icon.className = "fa-solid fa-moon";
  }
});




