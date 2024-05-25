import { Mat4 } from "../lib/mat4"
import { Vec3 } from "../lib/vec3";

export class RubikPiece {
  index: number;
  vec: Vec3 = new Vec3();
  transformation = new Mat4();
  rotated = {
    x: 0,
    y: 0,
    z: 0
  }

  constructor(index: number, size: number) {
    this.index = index;
    const topLeft = (1.05 * Math.pow(2, size - 2)) * -1;
    
    this.vec.x = topLeft + 2.1*(index%size);
    this.vec.y = -topLeft - 2.1*((Math.floor(index/size)%size));
    this.vec.z = -topLeft - 2.1*(Math.floor(index/(size*size)));

    this.transformation.setTranslate(0.0, 0.0, 0.0);
  }

  rotateX(a: number) {
    // todo
  }
}