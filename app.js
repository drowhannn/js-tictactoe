const cellElements = document.getElementsByClassName("cell");

let xTurn = true;
let gameOver;
const xClass = "x";
const oclass = "o";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

document.getElementById("playagainButton").addEventListener("click", resetGame);

startGame();

function startGame() {
  [...cellElements].forEach((cell) => {
    cell.addEventListener("click", handleCellClick, { once: true });
  });
  xTurn = true;
  gameOver = false;
}

function handleCellClick(e) {
  let currentCell = e.target;
  let currentClass = xTurn ? xClass : oclass;
  displayXO(currentCell, currentClass);
  let gameOverMessage = "";
  if (checkForWin(currentClass)) {
    gameOver = true;
    gameOverMessage = (xTurn ? "X " : "O ") + "Wins!";
  } else if (checkForDraw()) {
    gameOver = true;
    gameOverMessage = "Draw!";
  }
  if (gameOver) {
    [...cellElements].forEach((cell) => {
      cell.removeEventListener("click", handleCellClick);
    });
    document.getElementById("endgameMessage").innerText = gameOverMessage;
    document.getElementById("messageContainer").classList.add("show");
  }
  swapTurn(currentClass);
}

function displayXO(currentCell, currentClass) {
  currentCell.classList.add(currentClass);
}

function checkForWin(currentClass) {
  return winningCombinations.some((combination) => {
    return combination.every((i) => {
      return cellElements[i].classList.contains(currentClass);
    });
  });
}

function checkForDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("o");
  });
}

function swapTurn(currentClass) {
  document.getElementById("board").classList.remove(currentClass);
  let nextClass = xTurn ? "o" : "x";
  document.getElementById("board").classList.add(nextClass);
  xTurn = !xTurn;
}

function resetGame() {
  if (document.getElementById("board").classList.contains("o")) {
    document.getElementById("board").classList.remove("o");
    document.getElementById("board").classList.add("x");
  }
  [...cellElements].forEach((cell) => {
    if (cell.classList.contains("o")) {
      cell.classList.remove("o");
    } else if (cell.classList.contains("x")) {
      cell.classList.remove("x");
    }
  });
  document.getElementById("messageContainer").classList.remove("show");
  startGame();
}

//dark mode
const toggleSwitch = document.getElementById("darkModeSwitch");
toggleSwitch.addEventListener("click", handleToggleSwitch);

const r = document.querySelector(":root");

function handleToggleSwitch() {
  if (toggleSwitch.checked) {
    r.style.setProperty("--primary-color", "black");
    r.style.setProperty("--secondary-color", "white");
    r.style.setProperty("--hover-color", "lightgray");
  } else {
    r.style.setProperty("--primary-color", "white");
    r.style.setProperty("--secondary-color", "black");
    r.style.setProperty("--hover-color", "lightgray");
  }
}
