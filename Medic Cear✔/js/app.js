

let betterSpan = document.querySelector("#home .info-box h1 span")

let arrOfBetterWord = ["Lives", "Days", "Health"];
let i = 0;
setInterval(() => {
  betterSpan.innerHTML = arrOfBetterWord[i++];
  if (i >= 3) {
    i = 0;
  }
}, 4000);

let about =document.querySelector(".about")
let years = document.querySelector(".about .text-box .num .data-box h1");

ScrollOut({
  targets: about,
});

console.log(+years.innerHTML);
console.log(+years.dataset.num);

window.addEventListener("scroll", () => {
  if (about.dataset.scroll == "in") {
    let count = setInterval(() => {
      if (+years.innerHTML < +years.dataset.num) {
        years.innerHTML =  +years.innerHTML + 1;
      } else
        clearInterval(count)
    }, 2000);
  } else {
    years.innerHTML = 0
  }
});

// animation
  AOS.init();