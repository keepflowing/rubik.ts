import { Mat4 } from "../lib/mat4";

// Coordinate transformation matrix
const g_modelMatrix = new Mat4(), g_mvpMatrix = new Mat4();

const pieces = [
  [-2.1, 2.1, 2.1], [0.0, 2.1, 2.1], [2.1, 2.1, 2.1],
  [-2.1, 0.0, 2.1], [0.0, 0.0, 2.1], [2.1, 0.0, 2.1],
  [-2.1, -2.1, 2.1], [0.0, -2.1, 2.1], [2.1, -2.1, 2.1],
  [-2.1, 2.1, 0.0], [0.0, 2.1, 0.0], [2.1, 2.1, 0.0],
  [-2.1, 0.0, 0.0], [0.0, 0.0, 0.0], [2.1, 0.0, 0.0],
  [-2.1, -2.1, 0.0], [0.0, -2.1, 0.0], [2.1, -2.1, 0.0],
  [-2.1, 2.1, -2.1], [0.0, 2.1, -2.1], [2.1, 2.1, -2.1],
  [-2.1, 0.0, -2.1], [0.0, 0.0, -2.1], [2.1, 0.0, -2.1],
  [-2.1, -2.1, -2.1], [0.0, -2.1, -2.1], [2.1, -2.1, -2.1],
]

export function draw(gl: WebGLRenderingContext, n: number,
  viewProjMatrix: Mat4, u_MvpMatrix: WebGLUniformLocation) {

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  for(let i = 0; i < pieces.length; i++) {
    g_modelMatrix.setTranslate(pieces[i][0], pieces[i][1], pieces[i][2]);
    drawBox(gl, n, viewProjMatrix, u_MvpMatrix); // Draw
  }
}

function drawBox(gl: WebGLRenderingContext, n: number,
  viewProjMatrix: Mat4, u_MvpMatrix: WebGLUniformLocation) {
  // Calculate the model view project matrix and pass it to u_MvpMatrix
  g_mvpMatrix.set(viewProjMatrix);
  g_mvpMatrix.multiply(g_modelMatrix);
  gl.uniformMatrix4fv(u_MvpMatrix, false, g_mvpMatrix.elements);
  // Draw
  gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
}