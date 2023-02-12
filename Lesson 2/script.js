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



    die() {
        for (let i in grassEaterArr) {
            if (grassEaterArr[i].x === this.x && grassEaterArr[i].y === this.y) {
                grassEaterArr.splice(i, 1);
                break;
            }

        }
        matrix[this.y][this.x] = 0;
    }


}

class AllEater extends All {
    constructor(x, y, energy) {
        super(x, y)
        this.energy = energy
        this.directions = []
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

class Character extends AllEater {
    constructor(x, y, energy) {
        super(x, y)
        this.energy = energy
        this.directions = []
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
    


}

class Grass extends All {
    constructor(x, y, energy) {
        super(x, y)
        this.energy = energy
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

}

class GrassEater extends All {
    constructor(x, y, energy) {
        super(x, y)
        this.energy = energy
    }

}

class Wall extends All {
    constructor(x, y, energy) {
        super(x, y)
        this.energy = energy
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
}



