const boardDiv = document.getElementById("board");
const statusText = document.getElementById("status");

let board = Array(9).fill("");
let currentPlayer = "X";
let vsComputer = false;
let gameActive = false;

const wins = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

// създаваме полето
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.onclick = () => makeMove(i);
  boardDiv.appendChild(cell);
}

function startPvP() {
  vsComputer = false;
  startGame();
}

function startPvC() {
  vsComputer = true;
  startGame();
}

function startGame() {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;
  statusText.innerText = "На ред е: X";
  updateBoard();
}

function makeMove(index) {
  if (!gameActive || board[index] !== "") return;

  board[index] = currentPlayer;
  updateBoard();

  if (checkWin(currentPlayer)) {
    statusText.innerText = currentPlayer + " печели!";
    gameActive = false;
    return;
  }

  if (board.every(c => c !== "")) {
    statusText.innerText = "Равен!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.innerText = "На ред е: " + currentPlayer;

  if (vsComputer && currentPlayer === "O") {
    setTimeout(computerMove, 500);
  }
}

function computerMove() {
  const emptyCells = board
    .map((v, i) => v === "" ? i : null)
    .filter(i => i !== null);

  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  makeMove(randomIndex);
}

function checkWin(player) {
  return wins.some(w => w.every(i => board[i] === player));
}

function updateBoard() {
  board.forEach((v, i) => {
    const cell = boardDiv.children[i];

    if (v !== "" && !cell.classList.contains("played")) {
      cell.classList.add("played");
      cell.innerHTML = `<span>${v}</span>`;
    }
  });
}