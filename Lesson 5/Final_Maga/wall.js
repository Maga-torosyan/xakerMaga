class Wall extends All {
    constructor(x, y) {
       super(x,y) 
        this.multiply = 0;
       
    }
  

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
