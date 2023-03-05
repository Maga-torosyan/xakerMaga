class All {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.energy = 10;
    this.directions = [];
  }

  getNewCoordinates() {
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

  chooseCell(choose) {
    let found = [];
    this.getNewCoordinates();
    for (let i in this.directions) {
      let x = this.directions[i][0];
      let y = this.directions[i][1];
      if (x >= 0 && y >= 0 && x < matrix[0].length && y < matrix.length) {
        if (matrix[y][x] === choose) {
          found.push(this.directions[i])
        }
      }

    }
    return found;
  }


}
