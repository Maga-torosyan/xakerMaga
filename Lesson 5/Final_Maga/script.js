let matrix = [];
let side = 50;
let grassArr = [];
let grassEaterArr = [];
let allEaterArr = [];
let character1Arr = [];
let wallArr = [];
let bombArr = [];
let weatherColor = 'black';
let exanakArr = [];
 let statistic = {};
var  socket = io();



function createMatrix(x, y) {
  for (let i = 0; i < y; i++) {
    matrix.push([])
    for (let j = 0; j < x; j++) {
      matrix[i].push(Math.round(Math.random() * 6))

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
      else if (matrix[y][x] === 6) {
        bombArr.push(new Bomb(x, y));
      }
    }
  }

  frameRate(7);
}


function draw() {

  if (frameCount % 5 == 0) {
    var statistic = {
        "frameCount": Math.round(frameCount/5),
        "exanakC": exanakArr.length,
        "grassC": grassArr.length,
        "allEaterC": allEaterArr.length,
        "character1C": character1Arr.length,
        "grassEaterC": grassEaterArr.length,
        "wallC": wallArr.length,
        "bombC": bombArr.length,
       
  }

    socket.emit("send statistics", statistic);
}


  

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === 1) {
        fill('green');
        rect(x * side, y * side, side, side)

      } else if (matrix[y][x] === 2) {
        fill('yellow');
        rect(x * side, y * side, side, side)
      } else if (matrix[y][x] === 3) {
        fill('blue');
        rect(x * side, y * side, side, side)
      }
      else if (matrix[y][x] === 4) {
        fill('pink');
        rect(x * side, y * side, side, side)
      }
      else if (matrix[y][x] === 5) {
        fill('white');
        rect(x * side, y * side, side, side)
      }
      else if (matrix[y][x] === 6) {
        fill('brown');
        rect(x * side, y * side, side, side)
      }


      else {
        fill(weatherColor);
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
  for (let i = 0; i < bombArr.length; i++) {
    bombArr[i].injure()
  }


}


