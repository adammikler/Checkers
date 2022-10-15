let board = new Array(64).fill(0);
const boardContainer = document.getElementById('board');

function testButton(i) {
    let place = document.getElementById(i);
    if(board[i] == -1) {
        let move1 = document.getElementById(i + 7);
        let move2 = document.getElementById(i + 9);
        move1.addEventListener ('click', () => {
            move1.innerHTML = '<img class="black-pieces" src="/pieces/white.png">';
            place.innerHTML = "";
            board[i] = 0;
            board[i + 7] = -1;
            console.log(board);
            //move1.removeEventListener('click' ());
        });
        move2.addEventListener ('click', () => {
            move2.innerHTML = '<img class="black-pieces" src="/pieces/white.png">';
            place.innerHTML = "";
            board[i] = 0;
            board[i + 9] = -1;
            console.log(board);
            //move1.removeEventListener('click' ());
        });
    } 
}

function generateBoard(board) {
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
    for (let i = 0; i < 64; i++) {
        document.getElementById(i).addEventListener ('click', (event) => {
            testButton(i);
        });
    }
};

generateBoard(board);