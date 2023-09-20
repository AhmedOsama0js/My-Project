let container = document.querySelector(".container");
let btns = document.querySelectorAll(".filter .btn-group button");


function getData() {
  fetch("./master/data/data.json")
    .then((res) => res.json())
    .then((d) => {
      getCards(d.data, "All");
      btns.forEach((btn) => {
        btn.addEventListener("click", () => {
          getCards(d.data, btn.dataset.type); 
        });
      });
    });
}
getData();



function getCards(d, Filter) {
  
  container.innerHTML = "";
  for (let i = 0; i < d.length; i++) {
    if (Filter === "All" || d[i].target === Filter) {
      container.innerHTML += `
    <div class = "box All "
    <div class="card col-ms-12 col-md-6 col-lg-4">
    <img src="${d[i].img}" class="card-img-top" alt="${d[i].target}-img">
    <div class="card-body">
    <h3 class="card-title text-center my-2 text-capitalize">${d[i].title}</h3>
    <a href="${d[i].a}" target="_blank" class="btn btn-primary my-2 text-center w-100">Open</a>
    </div>
    </div>
    </div>
    `;
    }
  }
}


