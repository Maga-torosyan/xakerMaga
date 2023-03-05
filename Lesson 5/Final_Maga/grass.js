class Grass extends All {
  constructor(x, y) {
    super(x, y)
    this.energy = 8;
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

