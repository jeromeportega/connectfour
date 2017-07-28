var gameBoard = document.getElementById("gameBoard");
var gameBoardArray = [];
var turn = 1;
var width = 7;
var height = 6;
var currLoc = [];

// Start the Game
initGame();

// This function initiliazes the game, creates the gameBoardArray, creates the DOM column elements, and starts the game logic via click events on those columns.
function initGame() {

  // Creating the gameBoardArray and filling it with all zeroes representing empty spaces.  I wanted to do this so the game could be scaled larger if needed.
  for (var i = 0; i < height; i++) {
    gameBoardArray[i] = [];
    for (var j = 0; j < width; j++) {
      gameBoardArray[i].push(0);
    }
  }
  for (var i = 0; i < width; i++) {
    gameBoard.innerHTML += "<div id='" + i + "' class='gameColumn'></div>";
  }
  var gameColumns = gameBoard.getElementsByClassName("gameColumn");

  // This for loop adds an event listener to each column to see which one the player clicks.
  for (var i = 0; i < gameColumns.length; i++) {
    gameColumns[i].addEventListener('click', function() {

      // The game attempts to place a token where the player or computer selected, then this places a token piece into the DOM for visual representation if successful.
      if(dropToken(Number(event.target.id))) {
        placePlayerToken(event.target);

        // Check if there is a winner after the player's turn.
        if(winCheck()) {
          declareWinner();
          return;
        } else {
          turn = 2;
          computerTurn();

          //Check if there's a winner after the computer's turn.
          if(winCheck()) {
            declareWinner();
            return;
          } else {
            turn = 1;
          }

          // After both players have taken their moves, make a quick check to make sure the whole board isn't full.
          tieCheck();
        }
      }
    });
  }
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
        currLoc = [i, col];
        return true;
      }
    }
  }
}

// placeToken puts a token piece into the DOM only if a player token was placed in gameBoardArray
function placePlayerToken(e) {
  e.innerHTML += "<div class='gameSquare redBack'><div>";
}

// This function puts finds an empty slot in the gameBoardArray and places a token in the array and the DOM.
function computerTurn() {
  var col = 0;
  var placement;
  while(true) {
    col = Math.floor(Math.random() * 7);
    if(gameBoardArray[0][col] === 0) {
      dropToken(col);
      placement = document.getElementById(col);
      placement.innerHTML += "<div class='gameSquare blueBack'><div>";
      break;
    }
  }
}

// Check if there was a winning move just made by either the computer or the player from the origin of the dropped piece.  Return a boolean.
function winCheck() {
  var winCounter = 1;
  var row = currLoc[0];
  var col = currLoc[1];
  var x;
  var y;

  // Check vertical lines
  console.log(currLoc);
  console.log(gameBoardArray);
  for (var i = row + 1; i < gameBoardArray.length; i++) {
    if (gameBoardArray[i][col] == turn) winCounter += 1;
    else break;
  }
  for (var i = row - 1; i >= 0; i--) {
    if (gameBoardArray[i][col] == turn) winCounter += 1;
    else break;
  }

  // Don't continue the function if a winner was already found to cut further down on iterations.
  if (winCounter >= 4) return true;
  else winCounter = 1;

  // Check horizontal lines
  for (var i = col + 1; i < gameBoardArray[row].length; i++) {
    if (gameBoardArray[row][i] == turn) winCounter += 1;
    else break;
  }
  for (var i = col - 1; i >= 0; i--) {
    if (gameBoardArray[row][i] == turn) winCounter += 1;
    else break;
  }
  if (winCounter >= 4) return true;
  else winCounter = 1;

  // Check bottom-right to upper-left diagonals
  x = row + 1;
  y = col + 1;

  while (x < gameBoardArray.length && y < gameBoardArray[row].length) {
    if (gameBoardArray[x][y] == turn) {
      winCounter += 1;
      x += 1;
      y += 1;
    } else {
      break;
    }
  }

  x = row - 1;
  y = col - 1;

  while (x >= 0 && y >= 0) {
    if (gameBoardArray[x][y] == turn) {
      winCounter += 1;
      x -= 1;
      y -= 1;
    } else {
      break;
    }
  }

  if (winCounter >= 4) return true;
  else winCounter = 1;

  // Check bottom-left to upper-right diagonals
  x = row - 1;
  y = col + 1;

  while (x >= 0 && y < gameBoardArray[row].length) {
    if (gameBoardArray[x][y] == turn) {
      winCounter += 1;
      x -= 1;
      y += 1;
    } else {
      break;
    }
  }

  x = row + 1;
  y = col - 1;

  while (x < gameBoardArray.length && y >= 0) {
    if (gameBoardArray[x][y] == turn) {
      winCounter += 1;
      x += 1;
      y -= 1;
    } else {
      break;
    }
  }

  if (winCounter >= 4) return true;

  // If no winner is found during the tests, return false.
  return false;
}

// Declares a winner by who laid down the winning token.  Let's the user know who won and allows them to restart the game.
function declareWinner() {
  if (turn == 1) {
    gameBoard.innerHTML += "<div class='animated fadeIn'><h1>You Win!</h1><button id='restart' class='blueBack red'>Restart</button></div>";
    document.getElementById('restart').addEventListener('click', function() {
      location.reload();
    });
  } else {
    gameBoard.innerHTML += "<div class='animated fadeIn'><h1>The Computer Wins!</h1><button id='restart' class='blueBack red'>Restart</button></div>";
    document.getElementById('restart').addEventListener('click', function() {
      location.reload();
    });
  }
}

// Checked if there is a draw by seeing if the entire top row has been filled.  If so, let's the user know it's a tie.
function tieCheck() {
  for (var i = 0; i < gameBoardArray[0].length; i++) {
    if (gameBoardArray[0][i] === 0) return;
  }
  gameBoard.innerHTML += "<div class='animated fadeIn'><h1>Its a draw!</h1><button id='restart' class='blueBack red'>Restart</button></div>";
  document.getElementById('restart').addEventListener('click', function() {
    location.reload();
  });
}
