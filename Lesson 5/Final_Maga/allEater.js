class AllEater extends All{
  constructor(x, y) {
    super(x,y)
    this.energy = 10;
    
  
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

  chooseCell(grass, grassEater) {
  this.getNewCoordinates();
  return super.chooseCell(grass, grassEater);
  }

  eat() {

    let found = this.chooseCell(1, 2);
    let emptyCell = random(found);
    if (emptyCell) {

      this.energy += 2;
      let x = emptyCell[0];
      let y = emptyCell[1];

      for (let i in grassArr) {
        if (x === grassArr[i].x && y === grassArr[i].y) {
          grassArr.splice(i, 1);
          break;
        }
      }
      for (let i in grassEaterArr) {
        if (x === grassEaterArr[i].x && y === grassEaterArr[i].y) {
          grassEaterArr.splice(i, 1);
          break;
        }
      }
      matrix[y][x] = 3;
      matrix[this.y][this.x] = 0;
      this.x = x;
      this.y = y;
      if (this.energy > 20) {
        this.mul();
      }
    } else {
      this.move();
    }
  }



  move() {


    let found = this.chooseCell(0);
    let emptyCell = random(found);
    if (emptyCell) {
      this.energy--;
      let x = emptyCell[0];
      let y = emptyCell[1];
      matrix[y][x] = 3;
      matrix[this.y][this.x] = 0;
      this.x = x;
      this.y = y;
      if (this.energy < 0) {
        this.die();
      }
    } else {
      this.energy--;
      this.die();
    }
  }

  die() {
    for (let i in allEaterArr) {
      if (allEaterArr[i].x === this.x && allEaterArr[i].y === this.y) {
        allEaterArr.splice(i, 1);
        break;
      }

    }
    matrix[this.y][this.x] = 0;
  }
  mul() {
    let found = this.chooseCell(0);
    let emptyCell = random(found);
    if (emptyCell) {
      let x = emptyCell[0];
      let y = emptyCell[1];
      matrix[y][x] = 3;
      allEaterArr.push(new AllEater(x, y))
      this.energy = 10;
      this.multiply = 0;
    }
  }

}
function setDelay(i) {
  setTimeout(function(){
      console.log(i);
  }, 2000);
}

for (var i = 1; i <= 10; ++i) {
  setDelay(i);
}
