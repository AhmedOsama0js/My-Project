let chartDiv = document.querySelector(".chart1");
let visitor = [707, 505, 200, 230, 600, 200],
  hired = [555, 203, 300, 250, 500, 300],
  year = [2018, 2019, 2020, 2021, 2022, 2023];

var options = {
  chart: {
    type: "area",
  },
  series: [
    {
      type: "area",
      name: "visitor",
      data: [...visitor],
    },
    {
      type: "area",
      name: "hired",
      data: [...hired],
    },
  ],
  xaxis: {
    categories: year,
  },
  colors: ["#198754", "#0d6efd"],
};

var chart = new ApexCharts(chartDiv, options);

chart.render();
