let board = new Array(64).fill(0);
const boardContainer = document.getElementById('board');

//generates the baord, pieces, piece locations in array
function generateBoard() {
    let index = 0;  //keeps track to give each square on board an ID
    let blackPieces = 12;   //Keeps track of total black pieces that need to be created
    let blank = 8;  //creates the two blank rows 
    let whitePieces = 12;   //keeps track of total black pieces to be created
    //double for loop to generate the board
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let boardSquare = document.createElement('button');     //creates the buttons
            boardContainer.appendChild(boardSquare);    //adds the button to the board
            boardSquare.setAttribute('id', index);  //keeps track of each button
            boardSquare.classList.add('board-square')   //adds the button class
            //this logic keeps track of the board rows so that the rows alternate colors correctly
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
                        board[index] = -1;
                    } else if (blank > 0) {
                        blank = blank - 1;  //creates the space inbetween black and white pieces
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


function whiteCapture(white, black) {
    for (let i = 0; i < board.length; i++) {
        if (board[i] == 1 && board[i - 7] == -1 && board[i - 14] == 0) {
            document.getElementById(i - 14).addEventListener ('click', () => {
                document.getElementById(i).innerHTML = '';
                document.getElementById(i - 7).innerHTML = '';
                document.getElementById(i - 14).innerHTML = '<img src="/pieces/white.png">';
                board[i] = 0;
                board[i - 18] = 1;
                black.updateTurn(black);
                white.updateTurn(white);
            })
        } else if (board[i] == 1 && board[i - 9] == -1 && board[i - 18] == 0) {
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
}

function blackCapture(player, white, black) {
    for (let i = 0; i < board.length; i++) {
        if (board[i] == -1 && board[i + 7] == 1 && board[i + 14] == 0) {
                document.getElementById(i + 14).addEventListener ('click', () => {
                    document.getElementById(i).innerHTML = '';
                    document.getElementById(i + 7).innerHTML = '';
                    document.getElementById(i + 14).innerHTML = '<img class="black-pieces" src="/pieces/white.png">';
                    board[i] = 0;
                    board[i + 18] = 1;
                    black.updateTurn(black);
                    white.updateTurn(white);
            });
        } else if (board[i] == -1 && board[i + 9] == 1 && board[i + 18] == 0) {
            document.getElementById(i + 18).addEventListener ('click', () => {
                document.getElementById(i).innerHTML = '';
                document.getElementById(i + 9).innerHTML = '';
                document.getElementById(i + 18).innerHTML = '<img class="black-pieces" src="/pieces/white.png">';
                board[i] = 0;
                board[i + 18] = 1;
                black.updateTurn(black);
                white.updateTurn(white);
            });
        }   
    }
}

//keeps track of how the pieces move, takes in the location of the piece clicked and both pieces
function Move(i, white, black) {
    let piece; //checks to see which players turn it is
    if (white.turn == 1) {
        piece = 'white';
        whiteCapture(white, black);
    } else {
        piece = 'black'
        blackCapture(white, black);
    }
    checkWin();

    let place = document.getElementById(i);
    //makes sure that the piece selected is matched by turn of the player
    if(board[i] == -1 && piece == 'black') {
        if (board[i + 7] == 0) {
            //makes sure that the board is emtpty down and to the left of selected piece
            let move1 = document.getElementById(i + 7);

            function blackMove(event) {
                move1.innerHTML = '<img class="black-pieces" src="/pieces/white.png">';
                place.innerHTML = "";
                board[i] = 0;
                board[i + 7] = -1;
                black.updateTurn(black);
                white.updateTurn(white);
                move1.removeEventListener(onclick, blackMove);
                move2.removeEventListener(onclick, blackMoveTwo);
            }

            move1.addEventListener('click', blackMove);
        } 
        if (board[i + 9] == 0) {
            let move2 = document.getElementById(i + 9);

            function blackMoveTwo(event) {
                move2.innerHTML = '<img class="black-pieces" src="/pieces/white.png">';
                place.innerHTML = "";
                board[i] = 0;
                board[i + 9] = -1;
                black.updateTurn(black);
                white.updateTurn(white);
                move1.removeEventListener(onclick, blackMove);
                move2.removeEventListener(onclick , blackMoveTwo);
            }

            move2.addEventListener('click', blackMoveTwo) 
        }
    } else if(board[i] == 1 && piece == 'white') {
        if(board[i - 7] == 0){
            let move1 = document.getElementById(i - 7);
            
            function whiteMove(event) {
                move1.innerHTML = '<img src="/pieces/white.png">';
                place.innerHTML = "";
                board[i] = 0;
                board[i - 7] = 1;
                black.updateTurn(black);
                white.updateTurn(white);
                move1.removeEventListener('click', whiteMove)
            };
            move1.addEventListener ('click', whiteMove) 
        } 
        if (board[i - 9] == 0) {
            let move2 = document.getElementById(i - 9);

            function whiteMoveTwo() {
                move2.innerHTML = '<img src="/pieces/white.png">';
                place.innerHTML = "";
                board[i] = 0;
                board[i - 9] = 1;
                black.updateTurn(black);
                white.updateTurn(white);
                move2.removeEventListener('click', whiteMoveTwo)
            };
            move2.addEventListener ('click', whiteMoveTwo) 
        }
    } 
}

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
    const white = Player(0, 'white');
    const black = Player(1, 'black');
    for (let i = 0; i < 64; i++) {
        document.getElementById(i).addEventListener ('click', () => {
            Move(i, white, black);
        });
    }
}

game();