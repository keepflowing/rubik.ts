import { Mat4 } from "../lib/mat4";
import { Vec3 } from "../lib/vec3";
import { RubikPiece } from "./RubikPiece";

export class RubiksCube {
  moving = false;
  pieces: Array<RubikPiece> = [];
  size: number;
  turns = 0;

  constructor(size: number) {
    this.size = size;

    for(let n = 0; n < Math.pow(size, 3); n++) {
      this.pieces.push(new RubikPiece(n, size));
    }

    this.sortPieces();
  }

  wV(v: Vec3) {
    return Math.round(v.x)*-1 + Math.round(v.y)*3 + Math.round(v.z)*10;
  }

  sortPieces() {
    this.pieces.sort((a, b) => {
      const aValue = this.wV(a.vec);
      const bValue = this.wV(b.vec);
      return bValue - aValue; // For descending order
    });
  }

  rotateX(prime = false, column = 0, turn = 0) {
    let a = prime ? -3 : 3;
    let n = prime ? -1 : 1;

    const rot = new Mat4();
    rot.setRotate(-a, 1, 0, 0);

    for(let i = column; i < Math.pow(this.size, 3); i+= this.size) {
      this.pieces[i].rotateX(-a);
      this.pieces[i].vec = rot.multiplyVector3(this.pieces[i].vec);
      if(turn+Math.abs(a) == 90) {
        const rx = this.pieces[i].r.x;
        const ry = this.pieces[i].r.y;
        const rz = this.pieces[i].r.z;
        this.pieces[i].r.y = new Mat4().setRotate(n*90, rx.x, rx.y, rx.z).multiplyVector3(ry);
        this.pieces[i].r.z = new Mat4().setRotate(n*90, rx.x, rx.y, rx.z).multiplyVector3(rz);
      }
    }
    
    if(turn+Math.abs(a) == 90) {
      this.sortPieces();
      this.turns++;
    }
    return Math.abs(a);
  }

  rotateY(prime = false, column = 0, turn = 0) {
    let a = prime ? -3 : 3;
    let n = prime ? -1 : 1;

    const rot = new Mat4();
    rot.setRotate(-a, 0, 1, 0);

    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        const p = i+3*column+9*j;
        this.pieces[p].rotateY(-a);
        this.pieces[p].vec = rot.multiplyVector3(this.pieces[p].vec);
        if(turn+Math.abs(a) == 90) {
          const rx = this.pieces[p].r.x;
          const ry = this.pieces[p].r.y;
          const rz = this.pieces[p].r.z;
          this.pieces[p].r.x = new Mat4().setRotate(n*90, ry.x, ry.y, ry.z).multiplyVector3(rx);
          this.pieces[p].r.z = new Mat4().setRotate(n*90, ry.x, ry.y, ry.z).multiplyVector3(rz);
        }
      }
    }

    if(turn+Math.abs(a) == 90) {
      this.sortPieces();
      this.turns++;
    }
    return Math.abs(a);
  }

  rotateZ(prime = false, column = 0, turn = 0) {
    let a = prime ? -3 : 3;
    let n = prime ? -1 : 1;

    const rot = new Mat4();
    rot.setRotate(-a, 0, 0, 1);

    for(let i = 0; i < 9; i++) {
      const p = i+9*column;
      this.pieces[p].rotateZ(-a);
      this.pieces[p].vec = rot.multiplyVector3(this.pieces[p].vec);
      if(turn+Math.abs(a) == 90) {
        const rx = this.pieces[p].r.x;
        const ry = this.pieces[p].r.y;
        const rz = this.pieces[p].r.z;
        this.pieces[p].r.x = new Mat4().setRotate(n*90, rz.x, rz.y, rz.z).multiplyVector3(rx);
        this.pieces[p].r.y = new Mat4().setRotate(n*90, rz.x, rz.y, rz.z).multiplyVector3(ry);
      }
  }

  if(turn+Math.abs(a) == 90) {
    this.sortPieces();
    this.turns++;
  }
    return Math.abs(a);
  }
}