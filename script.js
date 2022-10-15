let board = new Array(64).fill(0);
const boardContainer = document.getElementById('board');

function generateBoard() {
    let index = 0;
    let blackPieces = 12;
    let blank = 8;
    let whitePieces = 12;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let boardSquare = document.createElement('button');
            boardContainer.appendChild(boardSquare);
            boardSquare.setAttribute('id', index);
            boardSquare.classList.add('board-square')
            if (i % 2 == 0) {
                if ( j % 2 == 0) {
                    boardSquare.classList.add('white'); 
                } else {
                    boardSquare.classList.add('black');
                    if(blackPieces > 0) {
                        boardSquare.innerHTML = '<img class="black-pieces" src="/pieces/white.png">';
                        blackPieces--;
                        board[index] = -1;
                    } else if (blank > 0) {
                        blank = blank - 1;
                    } else if (blank == 0) {
                        boardSquare.innerHTML = '<img src="/pieces/white.png">';
                        whitePieces--;
                        board[index] = 1;
                    }
                };
            } else {
                if ( j % 2 == 0) {
                    boardSquare.classList.add('black');
                    if(blackPieces > 0) {
                        boardSquare.innerHTML = '<img class="black-pieces" src="/pieces/white.png">';
                        blackPieces--; 
                    } else if (blank > 0) {
                        blank = blank - 1;
                    } else if (blank == 0) {
                        boardSquare.innerHTML = '<img src="/pieces/white.png">';
                        whitePieces--;
                        board[index] = 1;
                    };
                } else {
                    boardSquare.classList.add('white');
                };
            };
            index++;
        };
    };
};

function Move(i, white, black) {
    let piece;
    if (white.turn == 1) {
        piece = 'white';
    } else {
        piece = 'black'
    }
    console.log(checkWin())
    legalMove(piece);

    let place = document.getElementById(i);
    if(board[i] == -1 && piece == 'black') {
        let move1 = document.getElementById(i + 7);
        let move2 = document.getElementById(i + 9);
        move1.addEventListener ('click', () => {
            move1.innerHTML = '<img class="black-pieces" src="/pieces/white.png">';
            place.innerHTML = "";
            board[i] = 0;
            board[i + 7] = -1;
            black.updateTurn(black);
            white.updateTurn(white);
        });
        move2.addEventListener ('click', () => {
            move2.innerHTML = '<img class="black-pieces" src="/pieces/white.png">';
            place.innerHTML = "";
            board[i] = 0;
            board[i + 9] = -1;
            black.updateTurn(black);
            white.updateTurn(white);
        });
    } else if(board[i] == 1 && piece == 'white') {
        let move1 = document.getElementById(i - 7);
        let move2 = document.getElementById(i - 9);
        move1.addEventListener ('click', () => {
            move1.innerHTML = '<img src="/pieces/white.png">';
            place.innerHTML = "";
            board[i] = 0;
            board[i - 7] = 1;
            black.updateTurn(black);
            white.updateTurn(white);
        });
        move2.addEventListener ('click', () => {
            move2.innerHTML = '<img src="/pieces/white.png">';
            place.innerHTML = "";
            board[i] = 0;
            board[i - 9] = 1;
            black.updateTurn(black);
            white.updateTurn(white);
        });
    } 
}

function legalMove(player) {
    for (let i = 0; i < board.length; i++) {
        if (player == 'white') {
            if(board[i - 7] == -1) {
                if(board[i - 14] == 0) {
                    document.getElementById(i - 14).addEventListener ('click', () => {
                        document.getElementById(i).innerHTML = '';
                        document.getElementById(i - 7).innerHTML = '';
                        document.getElementById(i - 14).innerHTML = '<img src="/pieces/white.png">';
                        board[i] = 0;
                        board[i - 18] = 1;
                        black.updateTurn(black);
                        white.updateTurn(white);
                    })
                }
            } else if (board[i - 9] == -1) {
                if(board[i - 18] == 0) {
                    document.getElementById(i - 18).addEventListener ('click', () => {
                        document.getElementById(i).innerHTML = '';
                        document.getElementById(i - 9).innerHTML = '';
                        document.getElementById(i - 18).innerHTML = '<img src="/pieces/white.png">';
                        board[i] = 0;
                        board[i - 18] = 1;
                        black.updateTurn(black);
                        white.updateTurn(white);
                    })
                }
            }
        } else if (player == 'black') {
            if(board[i + 7] == 1) {
                if(board[i + 14] == 0) {
                    document.getElementById(i + 14).addEventListener ('click', () => {
                        document.getElementById(i).innerHTML = '';
                        document.getElementById(i + 7).innerHTML = '';
                        document.getElementById(i + 14).innerHTML = '<img class="black-pieces" src="/pieces/white.png">';
                        board[i] = 0;
                        board[i + 18] = 1;
                        black.updateTurn(black);
                        white.updateTurn(white);
                    });
                };
            } else if (board[i + 9] == 1) {
                if(board[i + 18] == 0) {
                    document.getElementById(i + 18).addEventListener ('click', () => {
                        document.getElementById(i).innerHTML = '';
                        document.getElementById(i + 9).innerHTML = '';
                        document.getElementById(i + 18).innerHTML = '<img class="black-pieces" src="/pieces/white.png">';
                        board[i] = 0;
                        board[i + 18] = 1;
                        black.updateTurn(black);
                        white.updateTurn(white);
                    });
                };
            };
        };
    };
};

function checkWin() {
    let totalBlack = 0;
    let totalWhite= 0;
    for(let i = 0; i < 64; i++) {
        if(board[i] == -1) {
            totalBlack++;
        } else if (board[i] == 1) {
            totalWhite++;
        }
    }
    if (totalBlack == 0) {
        return 'whiteWins'
    } else if (totalWhite == 0) {
        return 'blackWins'
    }
};

const Player = (turn, color) => {
    const updateTurn = (piece) => {
        if (piece.turn == 1) {
           piece.turn = 0;
        } else {
            piece.turn = 1;
        }
    }

    return {turn, color, updateTurn}
};

function game() {
    generateBoard();
    const white = Player(1, 'white');
    const black = Player(0, 'black');
    for (let i = 0; i < 64; i++) {
        document.getElementById(i).addEventListener ('click', () => {
            Move(i, white, black);
        });
    }
}

game();