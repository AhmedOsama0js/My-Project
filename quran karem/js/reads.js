let containerSoura = document.querySelector(".souras-container");
let ayahtContainer = document.querySelector(".container-Ayah .content");
let audio = document.querySelector(".audio audio");
let playPause = document.querySelector(" #player");
let btnCentralVolume = document.querySelector(".btn-container");
let customRangeVolume = document.querySelector("#customRangeVolume");
let VolumControule = document.querySelector(".VolumControule");
let timeLineContainer = document.querySelector(".linePlay .line");
let totalTime = document.querySelector(".total-time");
let thumb = document.querySelector(".thumb");
let btnBack = document.querySelector("#back");
let btnNext = document.querySelector("#next");

let btnRepeat = document.querySelector("#repeat");
let repeat = false;

let currentTime = document.querySelector(".current-time");

let souraTarget = 1;
let ayaIndex = 0;
let AyahsAdios = [];
let AyahsText = [];

// get soura
async function fetchData() {
  document.getElementById("loadingSpinner").style.display = "block";
  try {
    const response = await fetch("./data/soura.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const suwarData = data.suwar;

    paintSouraName(suwarData);
    clickSouraName();
    document.getElementById("loadingSpinner").style.display = "none";
  } catch (error) {
    console.error("حدث خطأ: " + error.message);
  }
}
fetchData();

// parent soura

const paintSouraName = (data) => {
  for (let i = 0; i < data.length; i++) {
    containerSoura.innerHTML += `
        <div id="${data[i].id}" class="soura">
          <span id="${data[i].id}" class="num">${data[i].id}</span> <span id="${data[i].id}" class="name">${data[i].name}</span>
        </div>
    `;
  }
  document
    .querySelectorAll(".souras-container .soura")[0]
    .classList.add("active");
  
    getAyas (ayaIndex+ 1);
};

// target soura
const clickSouraName = () => {
  let souraName = document.querySelectorAll(".souras-container .soura");
  souraName.forEach((e) => {
    e.addEventListener("click", (s) => {
      souraName.forEach((ex) => {
        ex.classList.remove("active");
      });
      s.target.classList.add("active");
      ayaIndex = 0;
      souraTarget = s.target.id;
      getAyas(souraTarget);
      printAyah(ayaIndex + 1);
    });
  });
};

// get ayah
const getAyas = async (num) => {
  ayahtContainer.innerHTML = "";
  document.getElementById("loadingSpinner").style.display = "block";
  try {
    const response = await fetch(`https://api.quran.gading.dev/surah/${num}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const ayahData = data.data;
    document.getElementById("loadingSpinner").style.display = "none";
    printAyah(ayahData);
    audio.pause();
    cheek();
  } catch (error) {
    console.error("حدث خطأ: " + error.message);
  }
};



const printAyah = (d) => {
  AyahsAdios = [];
  AyahsText = [];
  ayahtContainer.innerHTML = `
              <h2 class="text-center fs-4 pb-3">${d.name.long}</h2>
              <h4 class = "py-2">﻿بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</h4>
            `;
  for (let i = 0; i < d.verses.length; i++) {
    AyahsAdios.push(d.verses[i].audio.primary);
    AyahsText.push(d.verses[i].text.arab);

    ayahtContainer.innerHTML += `<span class="aya" id="${i}">${
      AyahsText[i]
    }</span><span class="num" >(${i + 1})</span>`;
  }
  let ayas = document.querySelectorAll(".container-Ayah .content .aya");
  changeAyah(ayaIndex);
  clickAya(ayas);
};


btnRepeat.addEventListener("click", () => {
  btnRepeat.classList.toggle("active");
  if (btnRepeat.classList.contains("active")) {
    repeat = true;
  } else {
    repeat = false;
  }
});


audio.addEventListener("ended", () => {
  if (repeat) {
    changeAyah(ayaIndex);
    scrollToArticle(ayaIndex);
  } else {
    if (AyahsAdios.length > ayaIndex) {
    ayaIndex++;
    changeAyah(ayaIndex);
    scrollToArticle(ayaIndex);
  } else {
    audio.pause();
    ayaIndex = 0;
  }
}
});

// audio src changed
function changeAyah(index) {
  if (ayaIndex < AyahsText.length) {
    audio.src = AyahsAdios[index];
    ayaColorChange(index);
    audio.play();
    cheek();
  }
}

const ayaColorChange = (num) => {
  let ayas = document.querySelectorAll(".container-Ayah .content .aya");
  ayas.forEach((aya) => {
    aya.classList.remove("active");
    if (aya.id == num) {
      aya.classList.add("active");
    }
  });
};

const clickAya = (ayas) => {
  ayas.forEach((e) => {
    e.addEventListener("click", () => {
      ayaIndex = e.id;
      changeAyah(ayaIndex);
      scrollToArticle(ayaIndex);
    });
  });
};

// aya read in center
function scrollToArticle(ayaIndex) {
  var targetElements = document.querySelectorAll(
    ".container-Ayah .content .aya"
  );
  if (ayaIndex < AyahsText.length) {
    if (ayaIndex >= 0 && ayaIndex < targetElements.length) {
      var targetElement = targetElements[ayaIndex];
      targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      console.log("فهرس الآية غير صحيح");
    }
  }
}

// ظظظظ

// toggle play

playPause.addEventListener("click", togglePaly);

function cheek(){
  if (audio.paused) {
      playPause.innerHTML = `
      <i class="fa-solid fa-play"></i>
    `;
  } else {
        playPause.innerHTML = `
      <i class="fa-solid fa-pause"></i>
        `;
  }
}

function togglePaly() {
  if (audio.paused) {
    audio.play();
   cheek();
  } else {
    audio.pause();
    cheek();
  }
}


// next And Prev btn
btnNext.addEventListener("click", changNextSoura);
btnBack.addEventListener("click", changPrevSoura);

function changNextSoura() {
  if (AyahsText.length <= ayaIndex) {
    return;
  } else {
    ayaIndex++;
      changeAyah(ayaIndex);
      changeAyah(ayaIndex);
    scrollToArticle(ayaIndex);
    cheek();
  }
}

function changPrevSoura() {
  if ( ayaIndex <=0) {
    return;
  } else {
    ayaIndex--;
    changeAyah(ayaIndex);
    changeAyah(ayaIndex);
    scrollToArticle(ayaIndex);
    cheek();
  }
}


// volume btn

btnCentralVolume.addEventListener("click", toggleMute);
customRangeVolume.addEventListener("input", (e) => {
  audio.volume = e.target.value;

  audio.muted = e.target.value === 0;
});

function toggleMute() {
  audio.muted = !audio.muted;
}

audio.addEventListener("volumechange", () => {
  customRangeVolume.value = audio.volume;
  let volumeLevel;
  if (audio.muted || audio.volume == 0) {
    customRangeVolume.value = 0;
    volumeLevel = "mute";
  } else if (audio.volume >= 0.7) {
    volumeLevel = "hight";
  } else if (audio.volume >= 0.5) {
    volumeLevel = "middle";
  } else {
    volumeLevel = "low";
  }

  VolumControule.dataset.volume = volumeLevel;
});


// time audio load


audio.addEventListener("loadeddata", () => {
  totalTime.textContent = formatDataTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  currentTime.textContent = formatDataTime(audio.currentTime);
  let percent = audio.currentTime / audio.duration;
  timeLineContainer.style.setProperty("--preview-progress", percent);
});

function formatDataTime(time) {
  let seconds = Math.floor(time % 60);
  let minutes = Math.floor(time / 60) % 60;
  let hours = Math.floor(time / 3600);

  seconds = seconds < 10 ? `0${seconds}` : seconds;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  if (hours === 0) {
    return `${minutes}:${seconds}`;
  } else {
    return `${hours}:${minutes}:${seconds}`;
  }
}

// time line

timeLineContainer.addEventListener("mouseover", handlerTimeLine);
timeLineContainer.addEventListener("mousedown", toggleIsScrubbing);

document.addEventListener("mouseup", (e) => {
  if (isScrubbing) toggleIsScrubbing(e);
});
document.addEventListener("mousemove", (e) => {
  if (isScrubbing) handlerTimeLine(e);
});

let isScrubbing = false;
let wasPaused;
function toggleIsScrubbing(e) {
    let rect = timeLineContainer.getBoundingClientRect();
    let percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;

  isScrubbing = (e.buttons & 1) == 1
  
  timeLineContainer.classList.toggle("scrubbing", isScrubbing);
  if (isScrubbing) { 
    wasPaused = audio.paused
    audio.pause()
  } else {
    if (!wasPaused) {
      audio.currentTime = percent * audio.duration
      audio.play()
    }
  }
  handlerTimeLine(e);
}


function handlerTimeLine(e) {
  let rect = timeLineContainer.getBoundingClientRect();
  let percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
  timeLineContainer.style.setProperty("--progress-position", percent);

  if (isScrubbing) {
    e.preventDefault();
    timeLineContainer.style.setProperty("--preview-progress", percent);
  }
}
