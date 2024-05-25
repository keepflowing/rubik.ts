import { RubikPiece } from "./RubikPiece";

export class RubiksCube {
  moving = false;
  pieces: Array<RubikPiece> = [];
  size: number;

  constructor(size: number) {
    this.size = size;

    for(let n = 0; n < Math.pow(size, 3); n++) {
      this.pieces.push(new RubikPiece(n, size));
    }
  }

  rotateX(prime = false, column = 0, turn = 0) {
    let a = prime ? -3 : 3;

    for(let i = column; i < Math.pow(this.size, 3); i+= this.size) {
      this.pieces[i].transformation.translate(
        -this.pieces[i].position[0], 
        -this.pieces[i].position[1],
        -this.pieces[i].position[2]).rotate(-a, 1, 0, 0);
      this.pieces[i].transformation.translate(
        this.pieces[i].position[0], 
        this.pieces[i].position[1],
        this.pieces[i].position[2]);
    }

    console.log(turn)
    if(turn+3 == 90) {
      // Move pieces
    }
    return Math.abs(a);
  }

  rotateY(prime = false, column = 0) {
    let a = prime ? -3 : 3;

    for(let r = column*this.size; r < 27; r+=9) {
      for(let i = 0; i < 3; i++) {
        this.pieces[r+i].transformation.translate(
          -this.pieces[r+i].position[0], 
          -this.pieces[r+i].position[1],
          -this.pieces[r+i].position[2]).rotate(-a, 0, 1, 0);
        this.pieces[r+i].transformation.translate(
          this.pieces[r+i].position[0], 
          this.pieces[r+i].position[1],
          this.pieces[r+i].position[2]);
      }
    }
    return Math.abs(a);
  }
}