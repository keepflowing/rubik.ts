import { Mat4 } from "./lib/mat4";
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
  var u_MvpMatrix = gl.getUniformLocation(shaderProgram, 'u_MvpMatrix');
  if (!u_MvpMatrix) { 
    console.log('Failed to get the storage location of u_MvpMatrix');
    return;
  }

  // Set the eye point and the viewing volume
  var mvpMatrix = new Mat4(null);
  mvpMatrix.setPerspective(30, canvas.width/canvas.height, 1, 100);
  mvpMatrix.lookAt(3, 3, 7, 0, 0, 0, 0, 1, 0);

  // Pass the model view projection matrix to u_MvpMatrix
  gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);

  // Clear color and depth buffer
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Draw the cube
  gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
}

main();