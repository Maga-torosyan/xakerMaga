class Bomb extends All {
    constructor(x, y) {
       super(x,y)
        this.multiply = 1;
      
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

        for (let i in bombArr) {
            if (bombArr[i].x === this.x && bombArr[i].y === this.y) {
                bombArr.splice(i, 1);
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
            matrix[y][x] = 6;
            wallArr.push(new Wall(x, y));


        }
    }





}


$('body').on('click', function(e) {
    explode(e.pageX, e.pageY);
  })
  
  
  function explode(x, y) {
    var particles = 15,
    explosion = $('<div class="explosion"></div>');
  
    
    $('body').append(explosion);
  
  
    explosion.css('left', x - explosion.width() / 2);
    explosion.css('top', y - explosion.height() / 2);
  
    for (var i = 0; i < particles; i++) {
     
      var x = (explosion.width() / 2) + rand(80, 150) * Math.cos(2 * Math.PI * i / rand(particles - 10, particles + 10)),
        y = (explosion.height() / 2) + rand(80, 150) * Math.sin(2 * Math.PI * i / rand(particles - 10, particles + 10)),
        color = rand(0, 255) + ', ' + rand(0, 255) + ', ' + rand(0, 255), 
        elm = $('<div class="particle" style="' +
          'background-color: rgb(' + color + ') ;' +
          'top: ' + y + 'px; ' +
          'left: ' + x + 'px"></div>');
  
      if (i == 0) { 
        elm.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
          explosion.remove(); 
        });
      }
      explosion.append(elm);
    }
  }
  
  
  function rand(min, max) {
    return Math.floor(Math.random() * (max + 1)) + min;
  }

