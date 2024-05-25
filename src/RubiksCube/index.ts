import { Mat4 } from "../lib/mat4";
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

    console.log(this.pieces);
  }

  rotateX(prime = false, column = 0, turn = 0) {
    let a = prime ? -3 : 3;

    const rot = new Mat4();
    rot.setRotate(-a, 1, 0, 0);

    for(let i = column; i < Math.pow(this.size, 3); i+= this.size) {
      this.pieces[i].rotateX(-a);
      this.pieces[i].vec = rot.multiplyVector3(this.pieces[i].vec);
      this.pieces[i].rotated.x += -a;
    }

    if(turn+Math.abs(a) == 90) {
      const c = column;
      const copy = [...this.pieces]
      this.pieces[c] = copy[c+6];
      this.pieces[c+3] = copy[c+15];
      this.pieces[c+6] = copy[c+24];
      this.pieces[c+9] = copy[c+3];
      this.pieces[c+15] = copy[c+21];
      this.pieces[c+18] = copy[c];
      this.pieces[c+21] = copy[c+9];
      this.pieces[c+24] = copy[c+18];
    }
    return Math.abs(a);
  }

  rotateY(prime = false, column = 0, turn = 0) {
    let a = prime ? -3 : 3;

    const rot = new Mat4();
    rot.setRotate(-a, 0, 1, 0);

    for(let r = column; r < 27; r+=9) {
      for(let i = 0; i < 3; i++) {
        this.pieces[r+i].vec = rot.multiplyVector3(this.pieces[r+i].vec);
        this.pieces[i].rotated.y += a;
      }
    }

    if(turn+Math.abs(a) == 90) {
      const c = column*3;
      const copy = [...this.pieces]
      this.pieces[c] = copy[c+2];
      this.pieces[c+1] = copy[c+11];
      this.pieces[c+2] = copy[c+20];
      this.pieces[c+9] = copy[c+1];
      this.pieces[c+11] = copy[c+19];
      this.pieces[c+18] = copy[c];
      this.pieces[c+19] = copy[c+9];
      this.pieces[c+20] = copy[c+18];
    }
    return Math.abs(a);
  }
}