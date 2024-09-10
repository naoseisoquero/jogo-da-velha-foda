const cells = document.querySelectorAll('[data-cell]');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');
const leftWinsDisplay = document.getElementById('left-wins');
const rightWinsDisplay = document.getElementById('right-wins');

let currentPlayer = 'BN'; 
let board = Array(9).fill(null); 

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], 
    [0, 3, 6],
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6], 
];

function handleClick(event) {
    const cell = event.target;
    const index = Array.from(cells).indexOf(cell);

    if (cell.hasChildNodes() || checkWinner()) return; 

    const img = document.createElement('img');
    
    if (currentPlayer === 'BN') {
        img.src = 'bncria3.png'; 
        img.alt = 'X'; 
        board[index] = 'BN';
        currentPlayer = 'TR';
        statusDisplay.textContent = 'Agora é a vez do time vitin';
    } else {
        img.src = 'vitin.png'; 
        img.alt = 'O'; 
        board[index] = 'TR';
        currentPlayer = 'BN';
        statusDisplay.textContent = 'Agora é a vez do time bn';// EU NAO FAÇO IDEIA DO POR QUE OS NOMES ESTAO INVERTIDOS
        //ENTAO TIVE QUE DEIXA ASSIM
    }
    
    cell.appendChild(img);

    if (checkWinner()) {
        statusDisplay.textContent = `O time ${currentPlayer === 'BN' ? 'VITIN' : 'BN'} venceu!`;
        updateScore(currentPlayer === 'BN' ? 'right' : 'left');
    } else if (board.every(cell => cell)) {
        statusDisplay.textContent = 'Empate!';
    }
}

function checkWinner() {
    return WINNING_COMBINATIONS.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function updateScore(winner) {
    if (winner === 'left') {
        leftWinsDisplay.textContent = parseInt(leftWinsDisplay.textContent) + 1;
    } else {
        rightWinsDisplay.textContent = parseInt(rightWinsDisplay.textContent) + 1;
    }
}

function resetGame() {
    cells.forEach(cell => cell.innerHTML = '');
    board = Array(9).fill(null); 
    currentPlayer = 'BN'; 
    statusDisplay.textContent = 'Jogador do time BN começa!';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
