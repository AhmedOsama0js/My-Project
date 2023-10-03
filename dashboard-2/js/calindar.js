
let newData = new Date(); 
let day = newData.toISOString().split("").slice(0, 8).join("");

document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");

  var calendar = new FullCalendar.Calendar(calendarEl, {
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
     
    initialDate: newData,
    navLinks: true,
    businessHours: true,
    editable: true,
    selectable: true,
    selectable: true,
    selectMirror: true,
    businessHours: true,
    select: function (arg) {
      var title = prompt("Event Title:");
      if (title) {
        calendar.addEvent({
          title: title,
          start: arg.start,
          end: arg.end,
          allDay: arg.allDay,
        });
      }
      calendar.unselect();
    },
    eventClick: function (arg) {
      if (confirm("Are you sure you want to delete this event?")) {
        arg.event.remove();
      }
    },
    
    editable: true,
    dayMaxEvents: true,
    locale: "ar",
    direction: "rtl",
    buttonText: {
      today: "اليوم",
      day: "يوم",
      week: "اسبوع",
      month: "شهر",
    },
    events: [
      {
        title: "Business Lunch",
        start: `${day}20`,
        end: `${day}23`,
        color: "#198754",
      },
      {
        title: "Business Lunch",
        start: `${day}20`,
        end: `${day}23`,
        color: "#198754",
      },
      {
        title: "Business Lunch",
        start: `${day}20`,
        end: `${day}23`,
        color: "#198754",
      },
      {
        title: "Business Lunch",
        start: `${day}01`,
        end: `${day}03`,
        color: "#198754",
      },
      {
        title: "meeting",
        start: `${day}27`,
        end: `${day}28`,
        color: "#0d6efd",
      },
      {
        title: "meeting",
        start: `${day}01`,
        end: `${day}02`,
        color: "#0d6efd",
      },
      {
        title: "meeting",
        start: `${day}01`,
        end: `${day}02`,
        color: "#0d6efd",
      },
      {
        title: "meeting",
        start: `${day}14`,
        end: `${day}16`,
        color: "#212529",
      },
      {
        title: "Meeting",
        start: `${day}06`,
        end: `${day}08`,
        constraint: "businessHours",
        constraint: "availableForMeeting",
        color: "#dc3545",
      },

      {
        start: `${day}09`,
        end: `${day}12`,
        overlap: false,
        display: "background",
        color: "#0d6efd",
      },
      {
        start: `${day}28`,
        end: `${day}31`,
        overlap: false,
        display: "background",
        color: "#dc3545",
      },
      {
        start: `${day}17`,
        end: `${day}20`,
        overlap: false,
        display: "background",
        color: "#198754",
      },
    ],
  });

  calendar.render();
});


var options = {
  series: [44, 55, 13, 33,],
  chart: {
    width: 500,
    height: 'auto',
    type: "donut",
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          show: false,
        },
      },
    },
  ],

  legend: {
    position: "right",
    offsetY: 0,
    height: 230,
  },
};

var chart = new ApexCharts(document.querySelector(".chart2"), options);
chart.render();

function appendData() {
  var arr = chart.w.globals.series.slice();
  arr.push(Math.floor(Math.random() * (100 - 1 + 1)) + 1);
  return arr;
}

function removeData() {
  var arr = chart.w.globals.series.slice();
  arr.pop();
  return arr;
}

function randomize() {
  return chart.w.globals.series.map(function () {
    return Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  });
}

function reset() {
  return options.series;
}

document.querySelector("#randomize").addEventListener("click", function () {
  chart.updateSeries(randomize());
});

document.querySelector("#add").addEventListener("click", function () {
  chart.updateSeries(appendData());
});

document.querySelector("#remove").addEventListener("click", function () {
  chart.updateSeries(removeData());
});

document.querySelector("#reset").addEventListener("click", function () {
  chart.updateSeries(reset());
});