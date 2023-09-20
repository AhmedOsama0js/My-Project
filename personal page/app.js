// localStorage choose

let getColorLocal = localStorage.getItem("color");

if (getColorLocal !== null) {
  document.documentElement.style.setProperty("--main-color", getColorLocal);
  document.querySelectorAll(".box.color .options span").forEach((span) => {
    span.classList.remove("active");

    if (span.dataset.color === getColorLocal) {
      span.classList.add("active");
    }
  });
}

// nav active color i

let containerToBody = document.querySelector(".container-to-body");

let home = document.querySelector("#home");
let about = document.querySelector("#about");
let work = document.querySelector("#work");

let navLi = [...document.querySelectorAll("nav ul li a i")];

window.addEventListener("scroll", () => {
  navLi.forEach((link) => {
    link.classList.remove("active");
  });
  if (
    window.scrollY >= home.offsetTop - 100 &&
    window.scrollY <= about.offsetTop
  ) {
    navLi[0].classList.add("active");
  }
  if (window.scrollY >= about.offsetTop && window.scrollY <= work.offsetTop) {
    navLi[1].classList.add("active");
  }
  if (window.scrollY >= work.offsetTop) {
    navLi[2].classList.add("active");
  }
});

// random Img
let background = true;
let inTervalRandom;

let chickRAndomInLocal = localStorage.getItem("random");

if (chickRAndomInLocal !== null) {
  if (chickRAndomInLocal == "true") {
    background = true;
    randomImg();
  } else {
    background == false;
  }
  document.querySelectorAll(".box.random .options span").forEach((span) => {
    span.classList.remove("active");
  });

  if (chickRAndomInLocal == "true") {
    document.querySelector(".box.random .options .yes").classList.add("active");
  } else {
    document.querySelector(".box.random .options .no").classList.add("active");
  }
}

let myPhoto = document.querySelector(".box-of-img img");

myPhoto.src = `img/photo2.jpg`;

function randomImg() {
  if (background === true) {
    inTervalRandom = setInterval(() => {
      let randomImg = Math.floor(Math.random() * 4);
      myPhoto.src = `img/photo${randomImg}.jpg`;
    }, 3000);
  }
}

// open &  close setting

let settingBox = document.querySelector(".settings-box");
let gear = document.querySelector(".settings-box .box-i");

gear.addEventListener("click", () => {
  settingBox.classList.toggle("open");
});

// ching color

let colors = document.querySelectorAll(".box.color .options span");

colors.forEach((color) => {
  color.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    localStorage.setItem("color", e.target.dataset.color);

    e.target.parentElement.querySelectorAll(".active").forEach((span) => {
      span.classList.remove("active");
    });

    e.target.classList.add("active");
  });
});

let closeRandom = document.querySelectorAll(".box.random .options span");

closeRandom.forEach((color) => {
  color.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll(".active").forEach((span) => {
      span.classList.remove("active");
    });

    e.target.classList.add("active");
    if (e.target.classList[0] === "yes") {
      background = true;
      randomImg();
      localStorage.setItem("random", true);
    } else {
      background = false;
      clearInterval(inTervalRandom);
      localStorage.setItem("random", false);
    }
  });
});

let nav = document.querySelector("nav");
let now = window.scrollY;

function toggleElementVisibility() {
  let scrollPosition = window.scrollY;

  if (scrollPosition < now) {
    nav.style.display = "block";
  } else {
    nav.style.display = "none";
  }

  now = scrollPosition;
}

window.addEventListener("scroll", toggleElementVisibility);
