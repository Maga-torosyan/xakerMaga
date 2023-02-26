class Character1 extends All {
  constructor(x, y) {
    super(x,y)
    this.energy = 5;
    this.gender = 7;

    
  }

 

  chooseCell(grassEater) {
    let found = [];
    this.getNewCoordinates();
    for (let i = 0; i < this.directions.length; i++) {
      let x = this.directions[i][0];
      let y = this.directions[i][1];
      if (x >= 0 && y >= 0 && x < matrix[0].length && y < matrix.length) {
        if (matrix[y][x] === grassEater) {
          found.push(this.directions[i])
        }
      }

    }
    return found;
  }

  eat() {


    let found = this.chooseCell(2);
    let emptyCell = random(found);
    if (emptyCell) {

      this.energy += 2;
      let x = emptyCell[0];
      let y = emptyCell[1];


      for (let i in grassEaterArr) {
        if (x === grassEaterArr[i].x && y === grassEaterArr[i].y) {
          grassEaterArr.splice(i, 1);
          break;
        }
      }
      matrix[y][x] = 4;
      matrix[this.y][this.x] = 0;
      this.x = x;
      this.y = y;
      if (this.energy > 10) {
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
      matrix[y][x] = 4;
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
    for (let i in character1Arr) {
      if (character1Arr[i].x === this.x && character1Arr[i].y === this.y) {
        character1Arr.splice(i, 1);
        break;
      }

    }
    matrix[this.y][this.x] = 0;
  }
  mul() {
    let found = this.chooseCell();
    let emptyCell = random(found);
    if (emptyCell) {
      let x = emptyCell[0];
      let y = emptyCell[1];
      matrix[y][x] = 4;
      character1Arr.push(new Character1(x, y))
      this.energy = 10;
      this.multiply = 0;
    }
    
   
    
  }
 

}

