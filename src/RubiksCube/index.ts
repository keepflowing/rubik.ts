import RubiksSide from "./RubiksSide";

export default class RubiksCube {
  sides: Array<RubiksSide> = [];

  constructor(n: number) {
    for(let i = 1; i <= 6; i++) {
      this.sides.push(new RubiksSide(i, n));
    }
    this.sides[1].squares[6] = 0;
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

  moveDown(prime: boolean) {
    this.moveUp(prime, 6);
  }

  moveRight(prime: boolean, o = 0) {
    
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