let allCard = document.querySelectorAll(".card");

let nam = document.querySelector(".name");

let input1 = document.querySelector(".box input");

let win = document.querySelector(".win");
let box = document.querySelector(".box");
let h3 = document.querySelector("h3");
let butn = document.querySelector("button");

let card1 = null;
let card2 = null;

let canClick = true;
let score = 0;
let count = document.querySelector(".count");

window.onload = function () {
  started();
};

allCard.forEach((card) => {
  card.addEventListener("click", isFlip);
});

function isFlip() {
  if (!canClick) return;
  if (this.classList.contains("flip")) return;

  this.classList.add("flip");

  if (!card1) card1 = this;
  else if (!card2) card2 = this;

  let img1 = card1 ? card1.firstElementChild.src : null;
  let img2 = card2 ? card2.firstElementChild.src : null;

  if (img1 === img2) {
    card1 = null;
    card2 = null;
    score++;
    count.innerHTML = `${score} / 10`;
    if (score === 10) gameOver();
  } else if (img1 && img2) {
    canClick = false;

    setTimeout(() => {
      card1.classList.remove("flip");
      card2.classList.remove("flip");

      card1 = null;
      card2 = null;
      canClick = true;
    }, 1000);
  }
}

function gameOver() {
  setTimeout(() => {
    win.style.transform = "translateY(0)";
    butn.textContent = "Play😍Agin";
    h3.textContent = "🤝Congratulations🤝";
    input1.classList.add("hid");
    input1 = "";
  }, 1000);
  butn.addEventListener("click", () => {
    location.reload();
  });
}
allCard.forEach((card) => {
  let random = Math.floor(Math.random() * allCard.length);
  card.style.order = random;
});

let started = () => {
  win.style.transform = "translateY(0)";

  input1.classList.remove("hid");

  h3.textContent = "inter your name";

  butn.textContent = "start";
  butn.style.fontSize = `20px`

  butn.addEventListener("click", () => {
    nam.innerHTML = `Hello : ${input1.value}`;
    win.style.transform = "translateY(-100%)";
  });
};
