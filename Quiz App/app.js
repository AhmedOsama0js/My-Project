//Select Elements
let count_question = document.querySelector(".quiz-info .question-count");

let h3Question = document.querySelector(".quiz-area h3");
let quizAnswer = document.querySelector(".quiz-answer");
let submitBtn = document.querySelector("button");
let progress = document.querySelector(".progress");
let progressBar = document.querySelector(".progress-bar");

// set Option
let questionIndex = 0;
let rightAnswers = 0;

// get data
getData = () => {
  fetch("./Data.json")
    .then((res) => res.json())
    .then((data) => {
      let qCount = data.questions.length;

      countQuestion(qCount);
      
      addQuestionData(data.questions[questionIndex], qCount);

      submitBtn.addEventListener("click", () => {
        rightAnswer = data.questions[questionIndex].correctAnswer;
        
        questionIndex++;
        
        checkedAnswer(rightAnswer, qCount);
        
        h3Question.innerHTML = "";
        quizAnswer.innerHTML = "";
        
        addQuestionData(data.questions[questionIndex], qCount);
        
        progressF(questionIndex, qCount);
        
        showResult(qCount);
        countQuestion(qCount);
      });
    });
};
getData();



addQuestionData = (question, count) => {
  if (questionIndex < count) {
    h3Question.innerHTML = question.question;
    for (let i = 0; i < question.options.length; i++) {
      let div = document.createElement("div");
      div.className = `answer my-2 form-control`;

      let input = document.createElement("input");
      input.className = `form-check-input`;
      input.type = "radio";
      input.id = `${i}`;
      input.name = "questions";
      input.dataset.answer = question.options[i];
      if (i == 0) {
        input.checked = true;
      }
      let label = document.createElement("label");
      label.className = "label w-75 ms-3";
      label.htmlFor = `${i}`;
      label.textContent = question.options[i];

      div.appendChild(input);
      div.appendChild(label);
      quizAnswer.appendChild(div);
    }
  }
};

checkedAnswer = (rAnswer, qCount) => {
  let answer = document.getElementsByName("questions");
  let chooseAnswer;

  for (let i = 0; i < answer.length; i++) {
    if (answer[i].checked) {
      chooseAnswer = answer[i].dataset.answer;
    }
  }

  if (rAnswer == chooseAnswer) {
    rightAnswers++;
  }
};

progressF = (num, qCount) => {
  let prog = ((num + 1) / qCount) * 100;

  progressBar.style.width = `${prog}%`;
};


countQuestion = (num) => {
  count_question.innerHTML = `Question Count: ${questionIndex + 1} / ${num}`;
};


showResult = (count) => {
  if (questionIndex == count) {
    
    progress.remove();
    h3Question.remove();
    quizAnswer.innerHTML = "";
    submitBtn.remove();

    if (rightAnswers > count / 2 && rightAnswers < count) {
      quizAnswer.innerHTML = `<div><h1 class="text-primary"> Good Answer </h1> <h4>${rightAnswers}/${count}</h4></div>`;
    } else if (rightAnswers === count) {
      quizAnswer.innerHTML = `<div><h1 class="text-success"> Perfect Answer </div>`;
    } else {
      quizAnswer.innerHTML = `<div><h1 class="text-danger"> bad Answer </h1> <h4>${rightAnswers}/${count}</h4></div>`;
    }
  }
  console.log(rightAnswers > count / 2);
};
