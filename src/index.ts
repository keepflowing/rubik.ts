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
    }
    draw(gl, n, viewProjMatrix, u_MvpMatrix, cube);
  })
}

main();