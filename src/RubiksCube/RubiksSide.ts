export default class RubiksSide {
  squares: Array<number>;

  constructor(symbol: number) {
    this.squares = Array(9).fill(symbol);
  }

  rotate(prime: boolean) {
    const copy = [...this.squares];
    if(prime) {
      for(let i = 0; i < 3; i++) {
        copy[6 - (i*3)] = this.squares[i];
        copy[7 - (i*3)] = this.squares[i+3];
        copy[8 - (i*3)] = this.squares[i+6];
      }
      this.squares = copy;
    }
    else {
      for(let i = 0; i < 3; i++) {
        this.squares[i] = copy[6 - (i*3)]
        this.squares[i+3] = copy[7 - (i*3)]
        this.squares[i+6] = copy[8 - (i*3)]
      }
    }
  }
}