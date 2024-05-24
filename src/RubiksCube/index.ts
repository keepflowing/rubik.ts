import { RubikPiece } from "./RubikPiece";

export class RubiksCube {
  pieces: Array<RubikPiece> = [];

  constructor(size: number) {
    for(let n = 0; n < Math.pow(size, 3); n++) {
      this.pieces.push(new RubikPiece(n, size));
    }
  }
}