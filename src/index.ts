import Cube from "./RubiksCube";

// WebGL main
function main() : void {
  // Vertex shader program
  const vsSource = `
  attribute vec4 aVertexPosition;
  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;
  void main() {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
  }
  `;

  // Fragment shader program
  const fsSource = `
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
  `;

  const canvas = document.querySelector("canvas");
  if(!canvas) return;

  const gl = canvas.getContext("webgl");
  if(!gl) return;

  gl.clearColor(0.3, 0.3, 0.3, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

}

main();

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