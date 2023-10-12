let containerSoura = document.querySelector(".souras-container");

let containerQuraa = document.querySelector(".container-quraa .content");

let imgQareaa = document.querySelector(".play-list-img");

let nameQareaa = document.querySelector(".name-player-list");

let audio = document.querySelector(".audio audio");

let playPause = document.querySelector(" #player");

let btnCentralVolume = document.querySelector(".btn-container");

let customRangeVolume = document.querySelector("#customRangeVolume");

let VolumControule = document.querySelector(".VolumControule");

let timeLineContainer = document.querySelector(".linePlay .line");

let totalTime = document.querySelector(".total-time");

let thumb = document.querySelector(".thumb");

let currentTime = document.querySelector(".current-time");

let avatarImg = document.querySelector(".audio .avatar img");

let avatarNama = document.querySelector(".avatar-name");

let btnBack = document.querySelector("#back");

let btnNext = document.querySelector("#next");

let btnRepeat = document.querySelector("#repeat");

let qareaTarget = "https://server11.mp3quran.net/shatri/";
let souraTarget = `001`;

let link = ``;
let repeat = false;

// get soura-name

fetch("./data/soura.json")
  .then((res) => res.json())
  .then((data) => {
    d = data.suwar;
    paintSouraName(d);
    clickSouraName();
  });

// paint data-soura-name

const paintSouraName = (data) => {
  for (let i = 0; i < data.length; i++) {
    containerSoura.innerHTML += `
        <div id="${data[i].id}" class="soura">
          <span id="${data[i].id}"  class="num">${data[i].id}</span> <span id="${data[i].id}"  class="name">${data[i].name}</span>
        </div>
    `;
  }
  document
    .querySelectorAll(".souras-container .soura")[0]
    .classList.add("active");
};

// click soura name

const clickSouraName = () => {
  let souraName = document.querySelectorAll(".souras-container .soura");
  souraName.forEach((e) => {
    e.addEventListener("click", (s) => {
      souraName.forEach((ex) => {
        ex.classList.remove("active");
      });
      s.target.classList.add("active");
      souraTarget = s.target.id;
      getLink();
      audio.play();
      togglePaly();
    });
  });
};

// get qarea data

fetch("./data/mashaykh.json")
  .then((res) => res.json())
  .then((data) => {
    let d = data.reciters;
    praintImg(d);
    getQareaToTarget(d);
  });

// praint data-img&name

const praintImg = (d) => {
  for (let i = 0; i < d.length; i++) {
    containerQuraa.innerHTML += `
          <div id="${d[i].id}" class="qareaa">
      <div class="img-qarea">
        <img id="${d[i].id}" src="${d[i].img}" alt="">
      </div>
      <div class="text">
        <p id="${d[i].id}" >${d[i].name}</p>
      </div>
    </div>
    `;
  }
};

// qarea target

const getQareaToTarget = (d) => {
  let quraa = document.querySelectorAll(".container-quraa .content .qareaa");
  quraa.forEach((e) => {
    e.addEventListener("click", (s) => {
      addActiveFromSoura(s.target);
      let target = d[s.target.id - 1];
      qareaTarget = target.moshaf[0].server;
      imgQareaa.src = target.img;
      imgQareaa.classList.toggle("rotate");
      avatarImg.src = target.img;
      avatarNama.textContent = target.name;
      nameQareaa.textContent = target.name;
      getLink();
      audio.play();
      togglePaly();
      addActiveFromSoura(+souraTarget);
    });
  });
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
    getLink();
    audio.play();
  } else {
    if (+souraTarget >= 114) {
      return;
    } else {
      +souraTarget++;
      getLink();
      addActiveFromSoura(+souraTarget);
      togglePaly();
      audio.play();
    }
  }
});

getLink = () => {
  if (`${souraTarget}`.length == 1) {
    souraTarget = `00${souraTarget}`;
  } else if (`${souraTarget}`.length == 2) {
    souraTarget = `0${souraTarget}`;
  } else {
    souraTarget = souraTarget;
  }
  link = `${qareaTarget}${souraTarget}.mp3`;
  audio.src = link;
};
getLink();

playPause.addEventListener("click", togglePaly);

function togglePaly() {
  if (audio.paused) {
    audio.play();
    playPause.innerHTML = `
    <i class="fa-solid fa-pause"></i>
    `;
  } else {
    audio.pause();
    playPause.innerHTML = `
        <i class="fa-solid fa-play"></i>
        `;
  }
}

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

// time audio play

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

  isScrubbing = (e.buttons & 1) == 1;

  timeLineContainer.classList.toggle("scrubbing", isScrubbing);
  if (isScrubbing) {
    wasPaused = audio.paused;
    audio.pause();
  } else {
    if (!wasPaused) {
      audio.currentTime = percent * audio.duration;
      audio.play();
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

// next And Prev btn
btnNext.addEventListener("click", changNextSoura);
btnBack.addEventListener("click", changPrevSoura);

function changNextSoura() {
  if (+souraTarget >= 114) {
    return;
  } else {
    +souraTarget++;
    getLink();
    addActiveFromSoura(+souraTarget);
  }
}

function changPrevSoura() {
  if (+souraTarget <= 1) {
    return;
  } else {
    +souraTarget--;
    getLink();
    addActiveFromSoura(+souraTarget);
  }
}

// add Active soura

function addActiveFromSoura(num) {
  let souraName = document.querySelectorAll(".souras-container .soura");
  souraName.forEach((e) => {
    e.classList.remove("active");
    if (e.id == num) {
      e.classList.add("active");
    }
  });
}
