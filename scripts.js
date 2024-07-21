// The gameboard which is a 3 x 3 array of cells
function gameBoard(){
    let rows = 3;
    let columns = 3;
    const board = [];
    for (let i = 0; i < rows; i++){
        board[i] = [];
        for (let j = 0; j < columns; j++){
            board[i].push(cell());
        }
    }

    const getBoard = () => board;

    const markCell = (tileNum, player) => {
        if (board[tileNum] === 0){
            board[tileNum].tick(player);
        } 
    }

    return {getBoard, markCell};
}

/* A cell is one of the squares of the tictactoe board
** 0: signifies that the square is empty
** 1: signifies that player 1 has taken the square
** 2: signifies that player 2 has taken the square
*/
function cell(){
    let state = 0;

    const tick = (player) => {
        state = player;
    }

    const getStatus = () => state;

    return {
        tick,
        getStatus
    };
}

function gameControl(){
    playerOne = "Player One";
    playerTwo = "Player Two"

    const board = gameBoard();

    const players = [
        {name: playerOne,
        token: 1
        },
        {name: playerTwo,
        token: 2
        }
    ];

    let currPlayer = players[0];

    //Switches the turn
    const switchTurn = () =>{
        currPlayer = currPlayer === players[0] ? players[1] : players[0];
    }

    // returns the current player
    const getCurrPlayer = () => currPlayer;

    const playMark = (row, column) => {
        const gameBoard = board.getBoard();
    
    }

    //Logic for displying the board
    const loadBoard = () => {
        const htmlBoard = document.getElementById('gameBoard');
        htmlBoard.innerHTML = '';

        const gameBoard = board.getBoard();
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                const tileBtn = document.createElement("button");
                tileBtn.className = "tile";

                //setting Data attributes for the button
                tileBtn.setAttribute("row", i);
                tileBtn.setAttribute("column", j);

                tileBtn.addEventListener('click', function() {
                    playMark(tileBtn.getAttribute('row'), tileBtn.getAttribute('column'));
                });

                tileBtn.textContent = displayLogic(gameBoard[i][j].getStatus());
                htmlBoard.appendChild(tileBtn);
            }
        }
    };

    // Checks the state of a cell
    const displayLogic = (state) => {
        if (state === 1){
            return "O";
        } else if (state === 2){
            return "X";
        }
        else {
            return "";
        }
    }


    return {
        switchTurn,
        getCurrPlayer,
        loadBoard
    };
}

gameController = gameControl();
gameController.loadBoard();
