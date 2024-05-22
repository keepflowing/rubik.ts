import Cube from "./RubiksCube";

import { initShaderProgram } from "./util/webgl";

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
  
  // init shader program
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
  if(!shaderProgram) return;

  // Collect all the info needed to use the shader program.
  // Look up which attribute our shader program is using
  // for aVertexPosition and look up uniform locations.
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
    },
  };


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