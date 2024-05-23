export function initShaders(gl: WebGLRenderingContext, VS: string, FS: string) {
  const vShader = loadShader(gl, gl.VERTEX_SHADER, VS);
  const fShader = loadShader(gl, gl.FRAGMENT_SHADER, FS);
  if(!vShader || !fShader) {
    console.error("Couldn't load shaders.")
    return null;
  }

  const shaderProgram = gl.createProgram();
  if(!shaderProgram) {
    console.error("Couldn't create shader program.")
    return null;
  }

  gl.attachShader(shaderProgram, vShader);
  gl.attachShader(shaderProgram, fShader);
  gl.linkProgram(shaderProgram);

  gl.useProgram(shaderProgram);
  
  if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error("Couldn't link shader program");
    return null;
  }

  return shaderProgram;
}

// Create and compile a shader of given type
function loadShader(gl: WebGLRenderingContext, type: any, source: string) {
  const shader = gl.createShader(type);
  if(!shader) {
    console.error("Couldn't create shader.")
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Couldn't compile shader.")
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}