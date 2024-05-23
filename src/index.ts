import { initShaders } from "./util/initShaders";

// Vertex Shader
const VSHADER = 
'attribute vec4 a_Position; \n' +
'void main() {\n' +
' gl_Position = a_Position;\n' + // Coordinates
'}\n';



// Fragment Shader
const FSHADER = 
'void main() {\n' +
' gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + // Set the color
'}\n';

// WebGL main
function main() : void {
  const canvas = document.querySelector("canvas");
  if(!canvas) return;

  const gl = canvas.getContext("webgl");
  if(!gl) return;

  if(!initShaders(gl, VSHADER, FSHADER)) return; 

  gl.clearColor(0.3, 0.3, 0.3, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

main();