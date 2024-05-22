import RubiksSide from "./RubiksSide";

export default class RubiksCube {
  sides: Array<RubiksSide> = [];

  constructor() {
    for(let i = 1; i <= 6; i++) {
      this.sides.push(new RubiksSide(i));
    }
    this.sides[1].squares[6] = 0;
    this.sides[2].squares[0] = 0;
    this.sides[3].squares[2] = 0;
    this.sides[0].squares[8] = 0;
    this.sides[5].squares[8] = 0;
  }

  moveUp(prime: boolean, o = 0) : void{
    const temp = this.sides[1].squares.slice(0+o, 3+o);
    if(prime) {
      for(let i = 0; i < 3; i++) {
        this.sides[1].squares[i+o] = this.sides[5].squares[8-(i+o)];
        this.sides[5].squares[8-(i+o)] = this.sides[3].squares[i+o];
        this.sides[3].squares[i+o] = this.sides[2].squares[i+o];
        this.sides[2].squares[i+o] = temp[i];
      }
    }
    else {
      for(let i = 0; i < 3; i++) {
        this.sides[1].squares[i+o] = this.sides[2].squares[i+o];
        this.sides[2].squares[i+o] = this.sides[3].squares[i+o];
        this.sides[3].squares[i+o] = this.sides[5].squares[8-(i+o)];
        this.sides[5].squares[8-(i+o)] = temp[i];
      }
    }
  }

  moveDown(prime: boolean) : void {
    this.moveUp(prime, 6);
  }

  moveLeft(prime: boolean, o = 0) : void {
    const temp = [
      this.sides[5].squares[0 + o], 
      this.sides[5].squares[3 + o],
      this.sides[5].squares[6 + o]
    ];

    o == 0 ? this.sides[1+o].rotate(prime) : this.sides[1+o].rotate(!prime);

    if(prime) {
      for(let i = 0; i < 3; i++) {
        this.sides[5].squares[i*3+o] = this.sides[0].squares[i*3+o];
        this.sides[0].squares[i*3+o] = this.sides[2].squares[i*3+o];
        this.sides[2].squares[i*3+o] = this.sides[4].squares[i*3+o];
        this.sides[4].squares[i*3+o] = temp[i];
      }
    }
    else {
      for(let i = 0; i < 3; i++) {
        this.sides[5].squares[i*3+o] = this.sides[4].squares[i*3+o];
        this.sides[4].squares[i*3+o] = this.sides[2].squares[i*3+o];
        this.sides[2].squares[i*3+o] = this.sides[0].squares[i*3+o];
        this.sides[0].squares[i*3+o] = temp[i];
      }
    }
  }

  moveRight(prime: boolean, o = 0) : void {
    this.moveLeft(!prime, 2);
  }

  moveFront(prime: boolean, o = 0) : void {
    const temp = o == 0 ? this.sides[0].squares.slice(6,9) 
      : this.sides[0].squares.slice(0,3);
    
    const k = o == 0 ? 0 : o-1;

    if(o != o) prime = !prime;
    this.sides[2+o].rotate(prime);

    if(prime) {
      for(let i = 0; i < 3; i++) {
        this.sides[0].squares[6+i-2*o] = this.sides[3].squares[i*3+k];
        this.sides[3].squares[i*3+k] = this.sides[4].squares[2-i+2*o];
        this.sides[4].squares[2-i+2*o] = this.sides[1].squares[8-3*i-k];
        this.sides[1].squares[8-3*i-k] = temp[i];
      }
    }
    else {
      for(let i = 0; i < 3; i++) {
        this.sides[0].squares[6+i-2*o] = this.sides[1].squares[8-3*i-k];
        this.sides[1].squares[8-3*i-k] = this.sides[4].squares[2-i+2*o];
        this.sides[4].squares[2-i+2*o] = this.sides[3].squares[i*3+k];
        this.sides[3].squares[i*3+k] = temp[i];
      }
    }
  }

  moveBack(prime: boolean) : void {
    this.moveFront(prime, 3);
  }

  print() {
    let msg = "";
    for(let r = 0; r < 4; r++) {
      for(let i = 0; i < 9; i+=3) {
        if(r == 0 || r >= 2 ) {
          const n = r >= 2 ? r + 2 : r;
          msg += "      " + this.sides[n].squares.slice(i, i+3) + "\n";
        }
        else {
          msg += this.sides[r].squares.slice(i, i+3) + " ";
          msg += this.sides[r+1].squares.slice(i, i+3) + " ";
          msg += this.sides[r+2].squares.slice(i, i+3) + "\n";
        }
      }
    }
    console.log(msg);
  }
}