// section skills animation

let sectionSkills = document.querySelector("#our-skills");
let skillsSpan = document.querySelectorAll("#minS");

// section Our Awesome Stats animation
let sectionAwesomeStats = document.querySelector("#stats");
let awesomeStatsSpan = document.querySelectorAll("#num");
let start = false;

// section Our Awesome Stats animation
let eventTimeSeconds = document.querySelector("#event-seconds");
let eventTimeMinute = document.querySelector("#event-minutes");
let eventTimeHours = document.querySelector("#event-hours");
let eventTimeDays = document.querySelector("#event-days");

// Scroll To Top
const scrollTopButton = document.getElementById("scroll-top");

window.onscroll = function () {
  //  skills animation
  if (window.scrollY >= sectionSkills.offsetTop - 100) {
    skillsSpan.forEach((e) => (e.style.width = e.dataset.width));
  }
  //  Our Awesome Stats animation
  if (window.scrollY >= sectionAwesomeStats.offsetTop - 100) {
    if (!start) {
      awesomeStatsSpan.forEach((e) => startCount(e));
    }
    start = true;
  }
  // Scroll To Top
  if (window.pageYOffset > 500) {
    scrollTopButton.style.display = "block";
  } else {
    scrollTopButton.style.display = "none";
  }
};

function startCount(el) {
  let goal = el.dataset.goal;
  let count = setInterval(() => {
    el.textContent++;
    if (el.textContent === goal) {
      clearInterval(count);
    }
  }, 2000 / goal);
}

// section event time

let countDownDate = new Date("Dec 31, 2024 23:59:59").getTime();

counter = setInterval(() => {
  //git time now
  let dateNow = new Date().getTime();
  //get between time
  let dateDiff = countDownDate - dateNow;
  //get time units
  let days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
  eventTimeDays.innerHTML = days;
  let hour = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  eventTimeHours.innerHTML = hour;
  let minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
  eventTimeMinute.innerHTML = minutes;
  let second = Math.floor((dateDiff % (1000 * 60)) / 1000);
  eventTimeSeconds.innerHTML = second;

  if (dateDiff < 0) {
    clearInterval(counter);
  }
}, 1000);

// console.log(countDownDate)

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
