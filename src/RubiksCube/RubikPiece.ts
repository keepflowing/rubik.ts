import { Mat4 } from "../lib/mat4"

export class RubikPiece {
  position: Array<number> = [];
  transformation = new Mat4();

  constructor(index: number, size: number) {
    const topLeft = (1.05 * Math.pow(2, size - 2)) * -1;
    this.position = [topLeft + 2.1*(index%size), 
      -topLeft - 2.1*((Math.floor(index/size)%size)),
      -topLeft - 2.1*(Math.floor(index/(size*size)))];
      
    this.transformation.setTranslate(0.0, 0.0, 0.0);
  }
}