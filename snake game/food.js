import { onSnake, expandSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";

let foodSnake = getRandomFoodPosition();
const GrowUpSnake = 1;



export const updateFood = () => {
  if (onSnake(foodSnake)) {
    expandSnake(GrowUpSnake);
    foodSnake = getRandomFoodPosition();
  }

};

export const drawFood = (gameBox) => {
  let foodElement = document.createElement("div");
  foodElement.style.gridColumnStart = foodSnake.x;
  foodElement.style.gridRowStart = foodSnake.y;
  foodElement.classList.add("food");
  gameBox.appendChild(foodElement);

};


function getRandomFoodPosition() {

  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
    
  }

  return newFoodPosition;
}



