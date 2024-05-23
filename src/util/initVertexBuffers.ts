export function initVertexBuffers(gl: WebGLRenderingContext, shaderProgram: WebGLProgram) {
  // Create a cube
  //    v6----- v5
  //   /|      /|
  //  v1------v0|
  //  | |     | |
  //  | |v7---|-|v4
  //  |/      |/
  //  v2------v3
  const vertices = new Float32Array([   // Vertex coordinates
     1.0, 1.0, 1.0,  -1.0, 1.0, 1.0,  -1.0,-1.0, 1.0,   1.0,-1.0, 1.0,  // v0-v1-v2-v3 front
     1.0, 1.0, 1.0,   1.0,-1.0, 1.0,   1.0,-1.0,-1.0,   1.0, 1.0,-1.0,  // v0-v3-v4-v5 right
     1.0, 1.0, 1.0,   1.0, 1.0,-1.0,  -1.0, 1.0,-1.0,  -1.0, 1.0, 1.0,  // v0-v5-v6-v1 up
    -1.0, 1.0, 1.0,  -1.0, 1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0,-1.0, 1.0,  // v1-v6-v7-v2 left
    -1.0,-1.0,-1.0,   1.0,-1.0,-1.0,   1.0,-1.0, 1.0,  -1.0,-1.0, 1.0,  // v7-v4-v3-v2 down
     1.0,-1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0, 1.0,-1.0,   1.0, 1.0,-1.0   // v4-v7-v6-v5 back
  ]);

  const colors = new Float32Array([     // Colors
    0.0, 0.8, 0.3,  0.0, 0.8, 0.3,  0.0, 0.8, 0.3,  0.0, 0.8, 0.3,  // v0-v1-v2-v3 front(green)
    0.8, 0.0, 0.0,  0.8, 0.0, 0.0,  0.8, 0.0, 0.0,  0.8, 0.0, 0.0, // v0-v3-v4-v5 right(red)
    1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  // v0-v5-v6-v1 up(white)
    1.0, 0.5, 0.0,  1.0, 0.5, 0.0,  1.0, 0.5, 0.0,  1.0, 0.5, 0.0,  // v1-v6-v7-v2 left(orange)
    0.8, 0.8, 0.0,  0.8, 0.8, 0.0,  0.8, 0.8, 0.0,  0.8, 0.8, 0.0,  // v7-v4-v3-v2 down(yellow)
    0.0, 0.0, 0.8,  0.0, 0.0, 0.8,  0.0, 0.0, 0.8,  0.0, 0.0, 0.8,   // v4-v7-v6-v5 back(blue)
  ]);

  const indices = new Uint8Array([       // Indices of the vertices
     0, 1, 2,   0, 2, 3,    // front
     4, 5, 6,   4, 6, 7,    // right
     8, 9,10,   8,10,11,    // up
    12,13,14,  12,14,15,    // left
    16,17,18,  16,18,19,    // down
    20,21,22,  20,22,23     // back
  ]);

  // Create a buffer object
  const indexBuffer = gl.createBuffer();
  if (!indexBuffer) return -1;

  // Write the vertex coordinates and color to the buffer object
  if (!initArrayBuffer(gl, vertices, 3, gl.FLOAT, 'a_Position', shaderProgram)) return -1;

  if (!initArrayBuffer(gl, colors, 3, gl.FLOAT, 'a_Color', shaderProgram)) return -1;

  // Write the vertex coordinates and color to the buffer object
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  return indices.length;
}

function initArrayBuffer(gl: WebGLRenderingContext, data: Float32Array,
  num: number, type: any, attribute: string, shaderProgram: WebGLProgram) {
  
  const buffer = gl.createBuffer();
  if(!buffer) {
    console.error("Failed to create buffer object.");
    return false;
  }

  // Write date into the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  // Assign the buffer object to the attribute variable
  const a_attribute = gl.getAttribLocation(shaderProgram, attribute);
  if (a_attribute < 0) {
    console.log('Failed to get the storage location of ' + attribute);
    return false;
  }
  gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
  // Enable the assignment of the buffer object to the attribute variable
  gl.enableVertexAttribArray(a_attribute);

  return true;

}
