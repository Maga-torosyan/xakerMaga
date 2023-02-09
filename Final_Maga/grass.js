class Grass {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.multiply = 0;
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x - 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y + 1]
    ];
  }
  chooseCell() {
    let found = [];
    for (let i = 0; i < this.directions.length; i++) {
      let x = this.directions[i][0];
      let y = this.directions[i][1];
      if (x >= 0 && y >= 0 && x < matrix[0].length && y < matrix.length) {
        if (matrix[y][x] === 0) {
          found.push(this.directions[i])
        }
      }

    }
    return found;
  }

  mul() {
    this.multiply++;
    let found = this.chooseCell();
    let emptyCell = random(found);
    if (emptyCell && this.multiply > 4) {
      let x = emptyCell[0];
      let y = emptyCell[1];
      matrix[y][x] = 1;
      grassArr.push(new Grass(x, y))

      this.multiply = 0;
    }
  }





}