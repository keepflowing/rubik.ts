import { RubiksCube } from "./RubiksCube";
import { Mat4 } from "./lib/mat4";
import { draw } from "./util/draw";
import { initShaders } from "./util/initShaders";
import { initVertexBuffers } from "./util/initVertexBuffers";

// Vertex Shader
const VSHADER = 
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'uniform mat4 u_MvpMatrix;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_Position = u_MvpMatrix * a_Position;\n' +
  '  v_Color = a_Color;\n' +
  '}\n';



// Fragment Shader
const FSHADER = 
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_FragColor = v_Color;\n' +
  '}\n';

let globalInterval = 8;

// WebGL main
function main() : void {
  const canvas = document.querySelector("canvas");
  if(!canvas) return;

  const gl = canvas.getContext("webgl");
  if(!gl) return;

  const shaderProgram = initShaders(gl, VSHADER, FSHADER)
  if(!shaderProgram) return; 

  const n = initVertexBuffers(gl, shaderProgram);
  if (n < 0) return;

  gl.clearColor(0.3, 0.3, 0.3, 1.0);
  gl.enable(gl.DEPTH_TEST);
  
  // Get the storage location of u_MvpMatrix
  const u_MvpMatrix = gl.getUniformLocation(shaderProgram, 'u_MvpMatrix');
  if (!u_MvpMatrix) { 
    console.log('Failed to get the storage location of u_MvpMatrix');
    return;
  }

  // Set the eye point and the viewing volume
  // Calculate the view projection matrix
  const viewProjMatrix = new Mat4();
  viewProjMatrix.setPerspective(30.0, canvas.width / canvas.height, 1.0, 100.0);
  viewProjMatrix.lookAt(20.0, 10.0, 30.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);

  const cube = new RubiksCube(3);
  
  draw(gl, n, viewProjMatrix, u_MvpMatrix, cube);

  document.addEventListener("keydown", (e) => {
    let rotating = false;
    let mode = 0;
    let params: Array<any>;

    switch(e.key) {
      case "ArrowRight":
        viewProjMatrix.rotate(5.0, 0.0, 1.0, 0.0);
        break;
      case "ArrowLeft":
        viewProjMatrix.rotate(-5.0, 0.0, 1.0, 0.0);
        break;
      case "ArrowDown":
        viewProjMatrix.rotate(5.0, 1.0, 0.0, 0.0);
        break;
      case "ArrowUp":
        viewProjMatrix.rotate(-5.0, 1.0, 0.0, 0.0);
        break;
      case "i":
        rotating = true;
        mode = 0;
        params = [false, 0];
        break;
      case "I":
        rotating = true;
        mode = 0;
        params = [true, 0];
        break;
      case "o":
        rotating = true;
        mode = 0;
        params = [false, 1];
        break;
      case "O":
        rotating = true;
        mode = 0;
        params = [true, 1];
        break;
      case "p":
        rotating = true;
        mode = 0;
        params = [false, 2];
        break;
      case "P":
        rotating = true;
        mode = 0;
        params = [true, 2];
        break;
      case "q":
        rotating = true;
        mode = 1;
        params = [false, 0];
        break;
      case "Q":
        rotating = true;
        mode = 1;
        params = [true, 0];
        break;
      case "w":
        rotating = true;
        mode = 1;
        params = [false, 1];
        break;
      case "W":
        rotating = true;
        mode = 1;
        params = [true, 1];
        break;
      case "e":
        rotating = true;
        mode = 1;
        params = [false, 2];
        break;
      case "E":
        rotating = true;
        mode = 1;
        params = [true, 2];
        break;
      case "r":
        rotating = true;
        mode = 2;
        params = [false, 0];
        break;
      case "R":
        rotating = true;
        mode = 2;
        params = [true, 0];
        break;
      case "u":
        rotating = true;
        mode = 2;
        params = [false, 2];
        break;
      case "U":
        rotating = true;
        mode = 2;
        params = [true, 2];
        break;
      case "y":
        rotating = true;
        mode = 2;
        params = [false, 1];
        break;
      case "Y":
        rotating = true;
        mode = 2;
        params = [true, 1];
        break;
      case "b":
        scrambleCube(cube);
        break;
    }
    
    if(rotating && !cube.moving) {
      cube.moving = true;
      let turn = 0;
      const i = setInterval(function() {
        turn += mode == 0 ? cube.rotateX(params[0], params[1], turn) 
        : mode == 1 ? cube.rotateY(params[0], params[1], turn) 
        : cube.rotateZ(params[0], params[1], turn);
        draw(gl, n, viewProjMatrix, u_MvpMatrix, cube);
        if(turn == 90) {
          clearInterval(i);
          cube.moving = false;
        }
      }, globalInterval);
    }
    draw(gl, n, viewProjMatrix, u_MvpMatrix, cube);
  })
}

main();

function scrambleCube(cube: RubiksCube) {
  const keys = 
    ['q', 'w', 'e', 'r', 'y', 'u', 'i', 'o', 'p',
     'Q', 'W', 'E', 'R', 'Y', 'U', 'I', 'O', 'P'];

  cube.turns = 0;
  globalInterval = 1;

  const i = setInterval(function() {
    const x = Math.floor(Math.random() * keys.length + 1);
    document.dispatchEvent(new KeyboardEvent('keydown', {'key': keys[x]}));
    if(cube.turns > 30) {
      clearInterval(i);
      globalInterval = 8;
    }
  }, 200);
}