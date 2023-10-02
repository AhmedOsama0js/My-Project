import {
  snakeSpeed,
  updateSnake,
  drawSnake,
  snakeInterSection,
  getSnakeHead,
  sendScore,
} from "./snake.js";
import { drawFood, updateFood } from "./food.js";
import { outsideGrid } from "./grid.js";
import { directions } from "./input.js";

  const up = document.querySelector(".up");
  const down = document.querySelector(".down");
  const left = document.querySelector(".left");
const right = document.querySelector(".right");
  
  let arr = [up, down, left, right];

let lastRenderTime = 0;
let gameBox = document.querySelector(".game-container");
let gameOver;

const main = (time) => {
  if (gameOver) {
    return Swal.fire({
      icon: "error",
      title: "Game Over",
      text: "Play Agana",
    }).then(() => {
      window.location.reload();
    });
  }
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (time - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / snakeSpeed) return;
  lastRenderTime = time;

  update();
  draw();
};
window.requestAnimationFrame(main);

const update = () => {
  updateSnake();
  updateFood();
  checkDeath();
};
const draw = () => {
  gameBox.innerHTML = "";
  drawSnake(gameBox);
  drawFood(gameBox);
};

directions(arr);


function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeInterSection();
}

