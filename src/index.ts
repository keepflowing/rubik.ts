import Cube from "./RubiksCube";

const cube = new Cube();
cube.print();

document.addEventListener("keydown", (e) => {
  switch(e.key) {
    case 'a':
      cube.moveLeft(false);
      break;
    case 'A':
      cube.moveLeft(true);
      break;
    case 'd':
      cube.moveRight(false);
      break;
    case 'D':
      cube.moveRight(false);
      break;
    case 'w':
      cube.moveUp(false);
      break;
    case 'W':
      cube.moveUp(true);
      break;
    case 's':
      cube.moveDown(false);
      break;
    case 'S':
      cube.moveDown(true);
      break;
    case 'k':
      cube.moveFront(false);
      break;
    case 'K':
      cube.moveFront(true);
      break;
    case 'l':
      cube.moveBack(false);
      break;
    case 'L':
      cube.moveBack(true);
      break;
  }

  console.clear();
  cube.print();
})