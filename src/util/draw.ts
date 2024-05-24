import { RubiksCube } from "../RubiksCube";
import { Mat4 } from "../lib/mat4";

// Coordinate transformation matrix
const g_modelMatrix = new Mat4(), g_mvpMatrix = new Mat4();

export function draw(gl: WebGLRenderingContext, n: number,
  viewProjMatrix: Mat4, u_MvpMatrix: WebGLUniformLocation, cube: RubiksCube) {

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  cube.pieces.forEach(piece => {
    g_modelMatrix.setTranslate(piece.position[0], piece.position[1], piece.position[2]);
    drawBox(gl, n, viewProjMatrix, u_MvpMatrix); // Draw
  })
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