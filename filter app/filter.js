let saturate = document.querySelector("#saturate");
let contrast = document.querySelector("#contrast");
let brightness = document.querySelector("#brightness");
let sepia = document.querySelector("#sepia");
let grayscale = document.querySelector("#grayscale");
let blur = document.querySelector("#blur");
let hueRotate = document.querySelector("#hue-rotate");

let upload = document.querySelector("#upload");
let download = document.querySelector(".download");
let reset = document.querySelector(".reset");

let img = document.querySelector("#img");
let imgBox = document.querySelector(".img-box");

let labels = document.querySelectorAll(".filter-box input");

function resetValue() {
  img.style.filter = "none";
  saturate.value = "100";
  contrast.value = "100";
  brightness.value = "100";
  sepia.value = "0";
  grayscale.value = "0";
  blur.value = "0";
  hueRotate.value = "0";
}

window.onload = () => {
  download.style.display = "none";
  reset.style.display = "none";
  imgBox.style.display = "none";
};

upload.onchange = () => {
  resetValue();
  download.style.display = "block";
  reset.style.display = "block";
  imgBox.style.display = "block";
  let file = new FileReader();
  file.readAsDataURL(upload.files[0]);
  file.onload = () => {
    img.src = file.result;
  };
};

labels.forEach((filter) => {
  filter.addEventListener("input", function () {
    img.style.filter = `
    saturate(${saturate.value}%)
    contrast(${contrast.value}%)
    brightness(${brightness.value}%)
    sepia(${sepia.value}%)
    grayscale(${grayscale.value})
    blur(${blur.value}px)
    hue-rotate(${hueRotate.value}deg)
    `;
  });
});


function saveImg() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = img.width
  canvas.height = img.height;
  ctx.filter = `saturate(${saturate.value}%) contrast(${contrast.value}%) brightness(${brightness.value}%) sepia(${sepia.value}%) grayscale(${grayscale.value}) blur(${blur.value}px) hue-rotate(${hueRotate.value}deg)`;
  ctx.drawImage(img,0,0 ,canvas.width,canvas.height);
  // document.body.appendChild(canvas)
  const link = document.createElement("a");
  link.download = "filtered-image.png";
  link.href = canvas.toDataURL();
  link.click();
}