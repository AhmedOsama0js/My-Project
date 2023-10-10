let radioContainer = document.querySelector(".radio-container");

let containerSoura = document.querySelector(".souras-container");

let containerQuraa = document.querySelector(".container-quraa .content");

let imgQareaa = document.querySelector(".play-list-img");

let nameQareaa = document.querySelector(".name-player-list");

let audio = document.querySelector(".audio audio");

let playPause = document.querySelector(" #player");

let btnCentralVolume = document.querySelector(".btn-container");

let customRangeVolume = document.querySelector("#customRangeVolume");

let VolumControule = document.querySelector(".VolumControule");

let avatarImg = document.querySelector(".audio .avatar img");



let QareaAudio = 0;

let src = "https://backup.qurango.net/radio/mahmoud_khalil_alhussary";

let urls = []
fetch("./data/radio.json")
  .then((res) => res.json())
  .then((data) => {
    for (let i = 0; i < data.radios.length; i++) {
      urls.push(data.radios[i].url);
      radioContainer.innerHTML += `
      <div id="${data.radios[i].id}" class="qarea">
    <img id="${data.radios[i].id}" src="${data.radios[i].img}" alt="${data.radios[i].name}">
    <p id="${data.radios[i].id}">${data.radios[i].name}</p>
    </div>
    `;
    }
    document
      .querySelectorAll(".radio-container .qarea")[0]
      .classList.add("active");
    audio.src = src;
    clickQarea(data.radios);
  });

const clickQarea = (d) => {
  let qareas = document.querySelectorAll(".radio-container .qarea");
  qareas.forEach((qarea) => {
    qarea.addEventListener("click", (s) => {
      qareas.forEach((e) => {
        e.classList.remove("active");
      });

      qarea.classList.add("active");
      QareaAudio = s.target.id - 1;
      src = d[QareaAudio].url
      audio.src = src
      imgQareaa.src = d[QareaAudio].img;
      imgQareaa.classList.toggle("rotate");
      avatarImg.src = d[QareaAudio].img;
      audio.play();
      cheek();
    });
  });
};


// playPause

playPause.addEventListener("click", togglePaly);

function togglePaly() {
  if (audio.paused) {
    audio.play();
    playPause.innerHTML = `
    <i class="fa-solid fa-pause"></i>
    `;
    cheek();
  } else {
    audio.pause();
    playPause.innerHTML = `
        <i class="fa-solid fa-play"></i>
        `;
    cheek();
  }
}

function cheek() {
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

cheek();

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

// add Active soura

function addActiveFromSoura(num) {
  let souraName = document.querySelectorAll(".radio-container .qarea ");
  souraName.forEach((e) => {
    e.classList.remove("active");
    if (e.id == num) {
      e.classList.add("active");
    }
  });
}
