export default class RubiksSide {
  squares: Array<number>;

  constructor(symbol: number, size: number) {
    this.squares = Array(9).fill(symbol);
  }
}