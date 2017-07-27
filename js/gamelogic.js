var gameBoard = document.getElementById("gameBoard");
var gameBoardArray = [
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0]
];
var turn = 1;

for (var i = 0; i < 7; i++) {
  gameBoard.innerHTML += "<div id='" + i + "' class='gameColumn'></div>";
}

var gameColumns = gameBoard.getElementsByClassName("gameColumn");

for (var i = 0; i < gameColumns.length; i++) {
  gameColumns[i].addEventListener('click', function() {

    // The game attempts to place a token where the player or computer selected, then this places a token piece into the DOM for visual representation if successful.
    if(dropToken(event.target.id)) placeToken(event.target);
  });
}

// This function drops the token into the gameBoardArray where the player selected, or the computer selected.
function dropToken(col) {
  console.log(turn);
  if (gameBoardArray[0][col] != 0) {
    alert("This column is full, please select a different column!");
    return false;
  } else {
    for (var i = gameBoardArray.length - 1; i > -1; i--) {
      if (gameBoardArray[i][col] === 0) {
        gameBoardArray[i][col] = turn;
        return true;
      }
    }
  }
}

// placeToken puts a token piece into the DOM only if a token was placed in gameBoardArray
function placeToken(e) {
  if(turn == 1) {
    e.innerHTML += "<div style='background-color: red' class='gameSquare'><div>";
    turn = 2;
  }
  else {
    e.innerHTML += "<div style='background-color: blue' class='gameSquare'><div>";
    turn = 1;
  }
}
