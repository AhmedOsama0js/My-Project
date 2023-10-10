let audio = document.querySelector(".Quran-player");
let bodySoura = document.querySelector(".offcanvas-body");
let next = document.querySelector(".next-ayah");
let play = document.querySelector(".play");
let prev = document.querySelector(".prev-ayah");
let ayahBox = document.querySelector(".ayah");
let canvas = document.querySelector(".offcanvas");

gitSura();
function gitSura() {
  fetch("https://api.quran.gading.dev/surah/")
    .then((q) => q.json())
    .then((data) => {
      for (let surah in data.data) {
        let sur = data.data[surah];
        bodySoura.innerHTML += `
                    <div class="soura-box">
              <span class="aya-name">${sur.name.long}</span>
              <p class="aya-englishName"> ${sur.name.transliteration.en}</p>
              <span class="aya-num">(${+surah + 1})</span>
            </div>
        `;
      }
      // selec All souras
      let allSurahs = document.querySelectorAll(".offcanvas-body  div");
      let AyahsAdios;
      let AyahsText;
      allSurahs.forEach((sura, index) => {
        sura.addEventListener("click", () => {
          fetch(`https://api.quran.gading.dev/surah/${index+1}`)
            .then((response) => response.json())
            .then((data) => {
              ayahBox.innerHTML = `
                      <p>${data.data.name.long}</p>
                      
              `;
              AyahsAdios = [];
              AyahsText = [];
              for (let aya in data.data.verses) {
                AyahsText.push(data.data.verses[aya].text.arab);
                AyahsAdios.push(data.data.verses[aya].audio.primary);
                ayahBox.innerHTML += `
                            <span class="aya" id="${aya}">${
                  AyahsText[aya]
                }</span>
                            <span>(${+aya + 1})</span>
                            `;
              }
              let ayaIndex = 0;
              changeAyah(ayaIndex);
              changeColorAya(ayaIndex);
              audio.addEventListener("ended", () => {
                ayaIndex++;
                if (AyahsAdios.length > ayaIndex) {
                  changeColorAya(ayaIndex);
                  changeAyah(ayaIndex);
                } else {
                  audio.pause();
                  ayaIndex = 0;
                  swal("انتهت السُورَةُ", "the sura is over", "success");
                  isPlay = true;
                  togglePlay();
                }
              });
              //changeAyah
              function changeAyah(index) {
                audio.src = AyahsAdios[index];
              }
              //changeColorAya
              function changeColorAya(i) {
                let ayahs = document.querySelectorAll(".ayah span");
                ayahs.forEach((e) => {
                  e.addEventListener("click", () => {
                    ayaIndex = +e.id;
                    changeColorAya(ayaIndex);
                    changeAyah(ayaIndex);
                  });
                  e.classList.remove("active");
                  if (+e.id == i) {
                    e.classList.add("active");
                  }
                });
              }
              //next button
              next.addEventListener("click", () => {
                if (ayaIndex < AyahsAdios.length - 1) {
                  ayaIndex++;
                  changeAyah(ayaIndex);
                  changeColorAya(ayaIndex);
                } else {
                  ayaIndex = 0;
                  changeAyah(ayaIndex);
                  changeColorAya(ayaIndex);
                }
              });
              //prev buuton

              prev.addEventListener("click", () => {
                if (ayaIndex <= 0) {
                  ayaIndex = 0;
                  changeAyah(ayaIndex);
                  changeColorAya(ayaIndex);
                } else {
                  ayaIndex--;
                  changeAyah(ayaIndex);
                  changeColorAya(ayaIndex);
                }
              });
              //togglePlay
              let isPlay = false;
              togglePlay();
              function togglePlay() {
                if (isPlay) {
                  audio.pause();
                  play.innerHTML = `<i class="fa-solid fa-play"></i>`;
                  isPlay = false;
                } else {
                  audio.play();
                  play.innerHTML = `<i class="fa-solid fa-pause"></i>`;
                  isPlay = true;
                }
              }
              play.addEventListener("click", togglePlay);
            });
          canvas.classList.remove("show");
        });
      });
    });
}
