const board = document.getElementById('board');
const size = 15; // kích thước bàn cờ
let player = 'X'; // người chơi hiện tại
const cells = {}; // object chứa các ô của bàn cờ

// tạo bàn cờ
for (let i = 1; i <= size; i++) {
  const row = document.createElement('tr');
  board.appendChild(row);
  for (let j = 1; j <= size; j++) {
    const cell = document.createElement('td');
    row.appendChild(cell);
    cell.addEventListener('click', () => {
      if (!cells[`${i}-${j}`]) { // kiểm tra ô chưa được đánh
        cell.innerText = player;
        cells[`${i}-${j}`] = player;
        if (checkWin(i, j, player)) { // kiểm tra thắng thua
          alert(`Người chơi ${player} thắng!`);
          resetBoard();
        } else if (checkDraw()) { // kiểm tra hòa
          alert('Hòa!');
          resetBoard();
        } else { // chuyển lượt người chơi
          player = player === 'X' ? 'O' : 'X';
        }
      }
    });
  }
}

// kiểm tra thắng thua
function checkWin(row, col, player) {
  let count = 0;
  // kiểm tra hàng ngang
  for (let j = col - 4; j <= col; j++) {
    if (cells[`${row}-${j}`] === player) {
      count++;
      if (count === 5) return true;
    } else {
      count = 0;
    }
  }
  // kiểm tra hàng dọc
  count = 0;
  for (let i = row - 4; i <= row; i++) {
    if (cells[`${i}-${col}`] === player) {
      count++;
      if (count === 5) return true;
    } else {
      count = 0;
    }
  }
  // kiểm tra đường chéo chính
  count = 0;
  for (let i = row - 4, j = col - 4; i <= row, j <= col; i++, j++) {
    if (cells[`${i}-${j}`] === player) {
      count++;
      if (count === 5) return true;
    } else {
      count = 0;
    }
  }
  // kiểm tra đường chéo phụ
  count = 0;
  for (let i = row - 4, j = col + 4; i <= row, j >= col; i++, j--) {
    if (cells[`${i}-${j}`] === player) {
      count++;
      if (count === 5) return true;
    } else {
      count = 0;
    }
  }
  return false;
}

// kiểm tra hòa
function checkDraw() {
  return Object.keys(cells).length === size * size;
}

// reset bàn cờ
function resetBoard() {
  for (let i = 1; i <= size; i++) {
    for (let j = 1; j <= size; j++) {
      cells[`${i}-${j}`] = null;
      const cell = board.rows[i-1].cells[j-1];
      cell.innerText = '';
    }
  }
  player = 'X';
}

