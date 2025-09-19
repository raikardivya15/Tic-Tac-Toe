(function() {
  const boardEl = document.getElementById('board');
  const tpl = document.getElementById('cell-template');
  const statusEl = document.getElementById('status');
  const overlay = document.getElementById('overlay');
  const resultText = document.getElementById('result-text');
  const btnNewGame = document.getElementById('new-game-btn');

  const scoreXEl = document.getElementById('score-x');
  const scoreOEl = document.getElementById('score-o');
  const scoreDEl = document.getElementById('score-d');

  let board = Array(9).fill(null);
  let turn = 'X';
  let active = true;
  let scores = { X: 0, O: 0, D: 0 };
  let cells = [];

  const winLines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  function initBoard() {
    boardEl.innerHTML = '';
    board = Array(9).fill(null);
    cells = [];
    for (let i=0;i<9;i++) {
      const node = tpl.content.firstElementChild.cloneNode(true);
      node.dataset.index = i;
      node.addEventListener('click', () => play(i));
      boardEl.appendChild(node);
      cells.push(node);
    }
    active = true;
    turn = 'X';
    statusEl.textContent = `Current: ${turn}`;
  }

  function play(i) {
    if (!active || board[i]) return;
    board[i] = turn;
    cells[i].textContent = turn;
    cells[i].style.color = turn === 'X' ? 'var(--x)' : 'var(--o)';

    const winner = checkWin();
    if (winner) {
      scores[winner]++;
      updateScores();
      showOverlay(`Player ${winner} Wins!`);
      return;
    }

    if (board.every(Boolean)) {
      scores.D++;
      updateScores();
      showOverlay("It's a Draw!");
      return;
    }

    turn = turn === 'X' ? 'O' : 'X';
    statusEl.textContent = `Current: ${turn}`;
  }

  function checkWin() {
    for (const [a,b,c] of winLines) {
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  function updateScores() {
    scoreXEl.textContent = scores.X;
    scoreOEl.textContent = scores.O;
    scoreDEl.textContent = scores.D;
  }

  function showOverlay(message) {
    active = false;
    resultText.textContent = message;
    overlay.style.display = 'flex';
  }

  function newGame() {
    overlay.style.display = 'none';
    initBoard();
  }

  btnNewGame.addEventListener('click', newGame);

  initBoard();
})();
