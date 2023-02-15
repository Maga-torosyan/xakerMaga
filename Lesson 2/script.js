let matrix = [];
let side = 50;
let grassArr = [];
let grassEaterArr = [];
let allEaterArr = [];
let character1Arr = [];
let wallArr = [];




function createMatrix(x, y) {
  for (let i = 0; i < y; i++) {
    matrix.push([])
    for (let j = 0; j < x; j++) {
      matrix[i].push(Math.round(Math.random() * 5))

    }
  }
}


function setup() {
  createMatrix(12, 12);
  createCanvas(matrix[0].length * side + 1, matrix.length * side + 1);

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === 1) {
        grassArr.push(new Grass(x, y));
      } else if (matrix[y][x] === 2) {
        grassEaterArr.push(new GrassEater(x, y));
      }
      else if (matrix[y][x] === 3) {
        allEaterArr.push(new AllEater(x, y));
      }
      else if (matrix[y][x] === 4) {
        character1Arr.push(new Character1(x, y));
      }
      else if (matrix[y][x] === 5) {
        wallArr.push(new Wall(x, y));
      }
    }
  }

  frameRate(3);
}


function draw() {

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === 1) {
        fill('green');
        rect(x * side, y * side, side, side)

      } else if (matrix[y][x] === 2) {
        fill('yellow');
        rect(x * side, y * side, side, side)
      } else if (matrix[y][x] === 3) {
        fill('red');
        rect(x * side, y * side, side, side)
      }
      else if (matrix[y][x] === 4) {
        fill('blue');
        rect(x * side, y * side, side, side)
      }
      else if (matrix[y][x] === 5) {
        fill('white');
        rect(x * side, y * side, side, side)
      }


      else {
        fill("black");
        rect(x * side, y * side, side, side)
      }

    }

  }
  // console.log(grassArr);


  for (let i = 0; i < grassArr.length; i++) {
    grassArr[i].mul();
  }
  for (let i = 0; i < grassEaterArr.length; i++) {
    grassEaterArr[i].eat()
  }
  for (let i = 0; i < allEaterArr.length; i++) {
    allEaterArr[i].eat()
  }
  for (let i = 0; i < character1Arr.length; i++) {
    character1Arr[i].eat()
  }
  for (let i = 0; i < wallArr.length; i++) {
    wallArr[i].injure()
  }


}










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
  

}

class AllEater extends All{


chooseCell(grass, grassEater) {
    let found = [];
    this.getNewCoordinates();
    for (let i = 0; i < this.directions.length; i++) {
      let x = this.directions[i][0];
      let y = this.directions[i][1];
      if (x >= 0 && y >= 0 && x < matrix[0].length && y < matrix.length) {
        if (matrix[y][x] === grass || matrix[y][x] === grassEater) {
          found.push(this.directions[i])
        }
      }

    }
    return found;
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

class Character1 extends All{
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

class Grass extends All {
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

class GrassEater extends All{
chooseCell(character) {
        this.getNewCoordinates();
        let found = [];
        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && y >= 0 && x < matrix[0].length && y < matrix.length) {
                if (matrix[y][x] === character) {
                    found.push(this.directions[i])
                }
            }

        }
        return found;
    }

    eat() {

        let found = this.chooseCell(1);
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
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            if (this.energy > 12) {
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
            matrix[y][x] = 2;
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
        for (let i in grassEaterArr) {
            if (grassEaterArr[i].x === this.x && grassEaterArr[i].y === this.y) {
                grassEaterArr.splice(i, 1);
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
            matrix[y][x] = 2;
            grassEaterArr.push(new GrassEater(x, y))
            this.energy = 8;
            this.multiply = 0;
        }
    }

}

class Wall extends All {

chooseCell(grassEater, allEater) {
        let found = [];
        this.getNewCoordinates();
        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && y >= 0 && x < matrix[0].length && y < matrix.length) {
                if (matrix[y][x] === grassEater || matrix[y][x] === allEater) {
                    found.push(this.directions[i])
                }
            }

        }
        return found;
    }

    injure() {
        let found = this.chooseCell(2, 3);
        let emptyCell = random(found);
        if (emptyCell) {
            let x = emptyCell[0];
            let y = emptyCell[1];
            if (matrix[y][x] === 2) {
                for (let i in grassEaterArr) {
                    if (x === grassEaterArr[i].x && y === grassEaterArr[i].y) {
                        grassEaterArr[i].energy--;
                        if (grassEaterArr[i].energy <= 10) {
                            this.energy++;
                            this.mul()
                        }
                        break
                    }
                }

            }
            if (matrix[y][x] === 3) {
                for (let i in allEaterArr) {
                    if (x === allEaterArr[i].x && y === allEaterArr[i].y) {
                        allEaterArr[i].energy--;
                        if (allEaterArr[i].energy <= 10) {
                            this.energy++;
                            this.mul()
                        }
                        break
                    }
                }

            }
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in wallArr) {
            if (wallArr[i].x === this.x && wallArr[i].y === this.y) {
                wallArr.splice(i, 1);
                break
            }
        }
    }

    mul() {

        let found = this.chooseCell();
        let emptyCell = random(found);
        if (emptyCell && this.multiply > 4) {
            let x = emptyCell[0];
            let y = emptyCell[1];
            matrix[y][x] = 5;
            wallArr.push(new Wall(x, y));


        }
    }

}




