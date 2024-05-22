import Cube from "./RubiksCube";

const cube = new Cube();
cube.print();

document.addEventListener("keydown", (e) => {
  if(e.key == "a") cube.moveLeft(false);
  else if(e.key == "A") cube.moveLeft(true);
  if(e.key == "d") cube.moveRight(false);
  else if(e.key == "D") cube.moveRight(true);
  if(e.key == "w") cube.moveUp(false);
  else if(e.key == "W") cube.moveUp(true);
  if(e.key == "s") cube.moveDown(false);
  else if(e.key == "S") cube.moveDown(true);

  if(e.key == "k") cube.moveFront(false);
  else if(e.key == "K") cube.moveFront(true);
  if(e.key == "l") cube.moveBack(false);
  else if(e.key == "L") cube.moveBack(true);

  console.clear();
  cube.print();
})