let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', '']

function game(cellIndex) {
    if (board[cellIndex] === "") {//empty?
        board[cellIndex] = currentPlayer

        renderBoard()
        console.log(board[cellIndex]);

        if (checkWinner() === true) {
            console.log(currentPlayer + "winns");
            displayMsg(currentPlayer + "  WINNS!!")
            stopGame()
        }
        else if ((board.every(cell => cell !== ''))) {
            console.log("DRAW");
            displayMsg( "IT'S  DRAW")
            stopGame()
        }
        else {
            currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
        }
    }
}


function checkWinner() {
    const win = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
        [0, 4, 8], [2, 4, 6]  //diagonals 
    ];

    for (let i of win) {
        const [a, b, c] = i;
        // console.log([a,b,c]);
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true
        }

    }
    return false
}


function renderBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
}


function displayMsg(message) {
    document.getElementById('message').textContent = message
}
function stopGame() {
    document.querySelectorAll(".cell").forEach(cell => {
        cell.removeEventListener('click', getdata)
    })
}

function getdata() {
    const cellIndex = this.dataset.index;
    game(cellIndex);
}


document.querySelectorAll(".cell").forEach(cell => {
    cell.addEventListener('click', getdata)
});

document.getElementById('reset').addEventListener('click', resetGame);

function resetGame(){
    currentPlayer='X'
    board = ['', '', '', '', '', '', '', '', '']
    renderBoard();
    displayMsg('');
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', getdata);
    });
}

