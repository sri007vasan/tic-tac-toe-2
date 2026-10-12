const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const resetButton = document.getElementById('reset');
const cells = Array.from(document.querySelectorAll('.cell'));
const STORAGE_KEY = 'tic-tac-toe-state';

let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameOver = false;

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const { board: sb, currentPlayer: cp, gameOver: go } = JSON.parse(saved);
    board = sb;
    currentPlayer = cp;
    gameOver = go;
    updateUI();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ board, currentPlayer, gameOver }));
}

function updateUI() {
  cells.forEach((cell, idx) => {
    cell.textContent = board[idx] || '';
    cell.dataset.player = board[idx] || '';
  });
  if (gameOver) {
    statusElement.textContent = gameOver === 'draw' ? 'Draw!' : `${gameOver} wins!`;
  } else {
    statusElement.textContent = `${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (const [a,b,c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function handleClick(e) {
  const idx = Number(e.target.dataset.cellIndex);
  if (gameOver || board[idx]) return;
  board[idx] = currentPlayer;
  if (checkWinner()) {
    gameOver = currentPlayer;
  } else if (board.every(Boolean)) {
    gameOver = 'draw';
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
  updateUI();
  saveState();
}

function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  gameOver = false;
  updateUI();
  saveState();
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);

loadState();
updateUI();
