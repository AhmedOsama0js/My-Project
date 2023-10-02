import { getInputDirection } from "./input.js";


let speed = prompt("ادخل سرعة التعبان")


export let snakeSpeed = speed;
let snakeBody = [{ x: 11, y: 11 }];
let newSegments = 0;
let score = 0;

export const updateSnake = () => {
  addSegments();
  let inputDirection = getInputDirection();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }

  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += -inputDirection.y;
};

export const drawSnake = (gameBox) => {
  snakeBody.forEach((segment) => {
    let snakeElement = document.createElement("div");
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.classList.add("snake");
    gameBox.appendChild(snakeElement);
  });
};

export function expandSnake(amount) {
  newSegments += amount;
}

export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false;
    return testPosition(segment, position);
  });
}

const testPosition = (p1, p2) => {
  return p1.x === p2.x && p1.y === p2.y;
};

export function getSnakeHead() {
  return snakeBody[0];
}
export function snakeInterSection() {
  return onSnake(snakeBody[0], { ignoreHead: true });
}
function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
    sendScore();
  }

  newSegments = 0;
}
let scoreEle = document.querySelector(".secor");
let bigScoreEle = document.querySelector(".big-secor");
  scoreEle.innerHTML = `score is = 0`;
export const sendScore = () => {
  score += Math.floor(speed / 2)
  bigScore(score);
  return (scoreEle.innerHTML = `score is = ${score}`);
};

const bigScore = (num) => {
  if (!localStorage.getItem("bigScore")) {
    localStorage.setItem("bigScore", 0);
  } else {
    if (+localStorage.getItem("bigScore") < num) {
      localStorage.setItem("bigScore", num);
    }
  }
};

if (localStorage.getItem("bigScore") == null) {
  bigScoreEle.innerHTML = `last big score is = 0`;
} else {
  bigScoreEle.innerHTML = `last big score is = ${localStorage.getItem(
    "bigScore"
  )}`;
}
