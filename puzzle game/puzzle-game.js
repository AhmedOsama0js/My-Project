let boxC = document.querySelector(".box-c");
var image = document.querySelector("img");
let idCanvas = 0;
let idBox = 0;

function addImageSectionsToPage(sections) {
  var container = document.querySelector(".canvas-container");
  sections.forEach(function (section) {
    container.appendChild(section);
  });
}

image.src = "https://picsum.photos/300/400";
image.onload = function () {
  var sectionWidth = 60;
  var sectionHeight = 80;
  var numSectionsX = Math.ceil(image.width / sectionWidth);
  var numSectionsY = Math.ceil(image.height / sectionHeight);
  var sections = [];
  for (var y = 0; y < numSectionsY; y++) {
    for (var x = 0; x < numSectionsX; x++) {
      var section = document.createElement("canvas");
      section.draggable = "true";
      section.classList.add(`id=${idCanvas++}`);
      var sectionContext = section.getContext("2d");
      var sx = x * sectionWidth;
      var sy = y * sectionHeight;
      var sw = Math.min(sectionWidth, image.width - sx);
      var sh = Math.min(sectionHeight, image.height - sy);
      section.width = sw;
      section.height = sh;
      sectionContext.drawImage(image, sx, sy, sw, sh, 0, 0, sw, sh);
      sections.push(section);
    }
  }

  for (let i = sections.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sections[i], sections[j]] = [sections[j], sections[i]];
  }

  addImageSectionsToPage(sections);
};

for (let i = 0; i < 25; i++) {
  let span = document.createElement("span");
  span.classList.add(`id=${idBox++}`);
  boxC.appendChild(span);
}

window.onload = function () {
  const allCanvas1 = document.querySelectorAll("div.canvas-container canvas");
  const allBoxSpan = document.querySelectorAll(".box-c span");

  allCanvas1.forEach((canvas) => {
    canvas.addEventListener("dragstart", () => {
      canvas.id = "is-drag";
    });

    canvas.addEventListener("dragend", () => {
      canvas.id = "";

      let finish = document.querySelectorAll(".box-c span canvas");

      let nave = document.querySelector(".navigation");
      if (finish.length === 25) {
        nave.style.transform = "translateY(0)";
      }
    });
  });

  allBoxSpan.forEach((box) => {
    box.addEventListener("dragover", (e) => {
      e.preventDefault();
      const curTask = document.getElementById("is-drag");
      if (curTask.className === box.className) {
        box.appendChild(curTask);
      }
    });
  });

  let imgBox = document.querySelector(".img-box");
  let show = document.querySelector(".button .show");

  show.addEventListener("click", () => {
    imgBox.classList.toggle("active");
  });
};

let reloadEnd = document.querySelector(".navigation .box span");

reloadEnd.addEventListener("click", () => {
  location.reload();
});

let reloadImg = document.querySelector(".button .reload");

reloadImg.addEventListener("click", () => {
  location.reload();
});
