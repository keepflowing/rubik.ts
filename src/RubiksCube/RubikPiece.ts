import { Mat4 } from "../lib/mat4"
import { Vec3 } from "../lib/vec3";

export class RubikPiece {
  index: number;
  vec: Vec3 = new Vec3();
  transformation = new Mat4();
  r = {
    x: new Vec3(1, 0, 0),
    y: new Vec3(0, 1, 0),
    z: new Vec3(0, 0, 1)
  }

  constructor(index: number, size: number) {
    this.index = index;
    const topLeft = (1.05 * Math.pow(2, size - 2)) * -1;
    
    this.vec.x = topLeft + 2.1*(index%size);
    this.vec.y = -topLeft - 2.1*((Math.floor(index/size)%size));
    this.vec.z = -topLeft - 2.1*(Math.floor(index/(size*size)));
  }

  rotateX(a: number) {
    const r = this.r.x;
    /*if(this.r.z%180 == 0) {
      if(this.r.y%180 == 0) this.transformation.rotate(a, 1.0, 0.0, 0.0);
      else this.transformation.rotate(a, 0.0, 0.0, 1.0);*/
    this.transformation.rotate(a, r.x, r.y, r.z);
  }

  rotateY(a: number) {
    const r = this.r.y;
    /*
    if(this.r.z%180 == 0) {
      if(this.r.x%180 == 0) this.transformation.rotate(a, 0.0, 1.0, 0.0);
      else this.transformation.rotate(a, 0.0, 0.0, 1.0);*/
    this.transformation.rotate(a, r.x, r.y, r.z);
  }
}