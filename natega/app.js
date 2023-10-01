let NAME = document.querySelector("#Name");
let BODY = document.querySelector("#Body-natega");
let Table = document.querySelector("#Table-nat");
let numGelos = document.querySelector(".num-gelos");
let btnSearch = document.querySelector("#btn-search");
let final = document.querySelector("#footer-nat");
let chartDiv = document.querySelector(".chart");
let chartActive = document.querySelector(".char-active");
let select = document.querySelector(".form-select");
let TABLE = document.querySelector(".table");

let chart;
let student;

fetch("./DATA.json")
  .then((res) => res.json())
  .then((data) => {
    five = data.Sheet5;
    six = data.Sheet6;

    btnSearch.addEventListener("click", () => {
      const studentId = numGelos.value;
      if (select.value == 1) {
        animation();
        fiveDAta(five, studentId);
      } else if (select.value == 2) {
        animation();
        sixDAta(six, studentId);
      } else {
        deleteData("اختر الصف");
        return;
      }
    });
  });

// student-data-Sixth-grade

fiveDAta = (data, id) => {
  const studentData = data.find((student) => student.Student_ID == id);
  if (studentData) {
    printDATA(studentData);
    chartActive.style.display = "block";
    let arr = [100, 100, 100, 100, 100, 100];
    printChart(studentData, arr);
  } else {
    deleteData("رقم الجلوس غير موجود");
  }
};

// student-data-Sixth-grade

sixDAta = (data, id) => {
  const studentData = data.find((student) => student.Student_ID == id);
  if (studentData) {
    printDATA(studentData);
    chartActive.style.display = "block";
    let arr = [40, 40, 40, 40, 80, 100];
    printChart(studentData, arr);
  } else {
    deleteData("رقم الجلوس غير موجود");
  }
};

// delete-data-from-error
const deleteData = (information) => {
  NAME.innerHTML = information;
  Table.innerHTML = "";
  BODY.innerHTML = "";
  final.innerHTML = "";
  chartActive.style.display = "none";
};

// print-data-in-page
const printDATA = (studentData) => {
  NAME.innerHTML = studentData.name;
  Table.innerHTML = `
              <tr>
      <th scope="col">المادة</th>
      <th scope="col">الدرجة</th>
      <th scope="col">التقدير</th>
    </tr>
          `;
  BODY.innerHTML = `
        <tr>
      <td>العربي </td>
      <td>${studentData.Arabic}</td>
      <td>${studentData.Arabic_level}</td>
    </tr>
    <tr>
      <td> الرياضيات </td>
      <td>${studentData.mathematics}</td>
      <td>${studentData.mathematics_level}</td>
    </tr>
    <tr>
      <td> الانجليزي</td>
      <td>${studentData.English}</td>
      <td>${studentData.English_level}</td>
      </tr>
      <tr>
      <td> الدراسات</td>
      <td>${studentData.Studies}</td>
      <td>${studentData.Studies_level}</td>
      </tr>
      <tr>
      <td> العلوم</td>
      <td>${studentData.Sciences}</td>
      <td>${studentData.Sciences_level}</td>
      </tr>
      <tr>
      <td> الدين</td>
      <td>${studentData.Religion}</td>
      <td>${studentData.Religion_level}</td>
      </tr>
      `;
  final.innerHTML = `
        <tr>
      <td><h4>المجموع النهائي</h4></td>
      <td><h4 >${studentData.total_score.toFixed(2)}</h4></td>
      <td><h4>${studentData.total_score_level}</h4></td>
      </tr>
          `;
};

// print-chart-in-page

const printChart = (studentData, arr) => {
  deg = [
    studentData.Religion,
    studentData.Sciences,
    studentData.Studies,
    studentData.English,
    studentData.mathematics,
    studentData.Arabic,
  ];
  let visitor = arr;
  let year = ["الدين", "العلوم", "الدراسات", "انجليزي ", "الرياضيات", "العربي"];
  var options = {
    chart: {
      type: "area",
      height: "auto",
      width: "100%",
    },
    series: [
      {
        type: "area",
        name: " درجة الطالب",
        data: [...deg],
      },
      {
        type: "area",
        name: "الدرجة النهائية للمواد",
        data: [...visitor],
      },
    ],
    xaxis: {
      categories: year,
    },
    colors: ["#198754", "#0d6efd"],
  };

  if (chart) {
    chart.updateSeries([{ data: deg }, { data: visitor }]);
  } else {
    chart = new ApexCharts(chartDiv, options);
    chart.render();
  }
};



function animation() {
  TABLE.style.animation = "tableUpdateAnimation 0.7s ease-in-out";
  setTimeout(() => {
    TABLE.style.animation = "none";
  }, 1000);
}
