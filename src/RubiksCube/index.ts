import { RubikPiece } from "./RubikPiece";

export class RubiksCube {
  pieces: Array<RubikPiece> = [];
  size: number;
  private step;

  constructor(size: number) {
    this.size = size;
    this.step = 1.05*(this.size-1);

    for(let n = 0; n < Math.pow(size, 3); n++) {
      this.pieces.push(new RubikPiece(n, size));
    }
  }

  rotateX(prime = false, column = 0) {
    let a = prime ? -3 : 3;

    for(let i = column; i < 27; i+= 3) {
      this.pieces[i].transformation.translate(
        -this.pieces[i].position[0], 
        -this.pieces[i].position[1],
        -this.pieces[i].position[2]).rotate(-a, 1, 0, 0);
      this.pieces[i].transformation.translate(
        this.pieces[i].position[0], 
        this.pieces[i].position[1],
        this.pieces[i].position[2]);
    }
  }
}