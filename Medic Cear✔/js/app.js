// nav active

let navLis = document.querySelectorAll(".collapse ul li a");

let home = document.querySelectorAll(".home");
let about = document.querySelector(".about");
let timeLine = document.querySelector(".our-timeline");
let ourPatients = document.querySelector(".our-patients");
let booking = document.querySelector(".booking");
let Contact = document.querySelector(".footer");
let yearEx = document.querySelector(".about-box .yearEx .ex h1");
let yearCountStart = false;
let aboutImgAin = false;
let ourTimelineTextAin = false;

function removeNavLi() {
  navLis.forEach((li) => {
    li.classList.remove("active");
  });
}

window.addEventListener("scroll", function () {
  if (window.scrollY < about.offsetTop) {
    removeNavLi();
    navLis[0].classList.add("active");
  }
  if (
    window.scrollY > about.offsetTop - 200 &&
    window.scrollY < timeLine.offsetTop
  ) {
    removeNavLi();
    navLis[1].classList.add("active");
    // count year Experiences
    if (!yearCountStart) {
      startCount();
    }
    yearCountStart = true;
    if (
      window.scrollY > about.offsetTop + 100 &&
      window.scrollY < timeLine.offsetTop
    ) {
      if (!aboutImgAin) {
        aboutImgAnimation();
      }
      aboutImgAin = true;
    }
  }
  if (
    window.scrollY > timeLine.offsetTop - 400 &&
    window.scrollY < ourPatients.offsetTop
  ) {
    if (!ourTimelineTextAin) {
      ourTimelineTextAnimation();
    }
    ourTimelineTextAin = true;

    if (
      window.scrollY > timeLine.offsetTop - 200 &&
      window.scrollY < ourPatients.offsetTop
    ) {
      removeNavLi();
      navLis[2].classList.add("active");
    }
  }
  if (
    window.scrollY > ourPatients.offsetTop - 200 &&
    window.scrollY < booking.offsetTop
  ) {
    removeNavLi();
    navLis[4].classList.add("active");
  }
  if (
    window.scrollY > booking.offsetTop - 200 &&
    window.scrollY < Contact.offsetTop
  ) {
    removeNavLi();
    navLis[5].classList.add("active");
  }
  if (window.scrollY > Contact.offsetTop - 500) {
    removeNavLi();
    navLis[6].classList.add("active");
  }
});

//  better Word  && slider chang
let betterWord = document.querySelector(".home .container .box-info h1 span");
let imgSlider = document.querySelector(".box-slider-img img ");
let arrOfBetterWord = ["Lives", "Days", "Health"];
let i = 0;
setInterval(() => {
  imgSlider.src = `imgs/slider/doctor-${i}.jpg`;
  betterWord.innerHTML = arrOfBetterWord[i++];
  if (i >= 3) {
    i = 0;
  }
}, 4000);

// slider chang animation

anime({
  targets: imgSlider,
  // opacity: [0.5, 1],
  easing: "easeInOutQuad",
  scale: [1, 1.2, 1],
  duration: 4000,
  loop: true,
});

// count year Experiences animation
function startCount() {
  anime({
    targets: yearEx,
    innerHTML: [0, 12],
    round: 1,
    easing: "easeInOutExpo",
  });
}

// about img animation

let aboutImg = document.querySelectorAll(".about .about-img .box img");

function aboutImgAnimation() {
  anime({
    targets: aboutImg[0],
    opacity: [0, 1],
    translateX: [-50, 0],
    easing: "easeInOutExpo",
    duration: 1000,
  });
  anime({
    targets: aboutImg[1],
    opacity: [0, 1],
    translateX: [50, 0],
    easing: "easeInOutExpo",
    duration: 1000,
  });
}

// ourTimeline animation
let ourTimelineText = document.querySelectorAll(".our-timeline .box .text");

function ourTimelineTextAnimation() {
  anime({
    targets: ourTimelineText,
    opacity: [0, 1],
    translateY: [250, 0],
    easing: "easeInOutExpo",
    duration: 1000,
  });
}

// ourPatients animation

// let ourPatientsCarousel = document.querySelectorAll(
//   ".our-patients .carousel .carousel-item"
// );

// let it = 0
// function ourPatientsCarouselAni() {
//   ourPatientsCarousel.forEach((e) => {
//     e.classList.remove("active")
//   })
//   ourPatientsCarousel[it++].classList.add("active");
//   if (it > ourPatientsCarousel.length - 1) {
//     it = 0;
//     ourPatientsCarousel[it].classList.add("active");
//   }
// }

// setInterval(ourPatientsCarouselAni,3000);
