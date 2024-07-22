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

    const inputName = () => {
        const nameForm = document.getElementById("nameInput");
        nameForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission
            const formData = new FormData(event.target);
            const formObj = Object.fromEntries(formData);
            players[0].name = formObj.playerOneName;
            players[1].name = formObj.playerTwoName;
            nameForm.remove();
            loadBoard();
        });
    }

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

        if (gameBoard[row][column].getStatus() === 0) {   
            gameBoard[row][column].tick(getCurrPlayer().token);
            
            switchTurn();
            loadBoard();
            if (checkWin() !== null){
                turn = document.getElementById("turn");
                turn.textContent = `${players[checkWin()-1].name} wins!`;
                restartGame();
            }
        } 
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
        turn = document.getElementById("turn");
        turn.textContent = `It is ${getCurrPlayer().name}'s turn!`;
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

    const checkWin = () => {
        const gameBoard = board.getBoard();
        checkDraw();

        // Check rows
        for (let i = 0; i < 3; i++) {
            if (gameBoard[i][0].getStatus() !== 0 && gameBoard[i][0].getStatus() === gameBoard[i][1].getStatus() 
            && gameBoard[i][1].getStatus() === gameBoard[i][2].getStatus()) {
                return gameBoard[i][0].getStatus();
            }
        }

        // Check columns
        for (let j = 0; j < 3; j++) {
            if (gameBoard[0][j].getStatus() !== 0 && gameBoard[0][j].getStatus() === gameBoard[1][j].getStatus() && 
            gameBoard[1][j].getStatus() === gameBoard[2][j].getStatus()) {
                return gameBoard[0][j].getStatus();
            }
        }

        // Check diagonals
        if (gameBoard[0][0].getStatus() !== 0 && gameBoard[0][0].getStatus() === gameBoard[1][1].getStatus() && 
        gameBoard[1][1].getStatus() === gameBoard[2][2].getStatus()) {
            return gameBoard[0][0].getStatus();
        }
        if (gameBoard[0][2].getStatus() !== 0 && gameBoard[0][2].getStatus() === gameBoard[1][1].getStatus() && 
        gameBoard[1][1].getStatus() === gameBoard[2][0].getStatus()) {
            return gameBoard[0][2].getStatus();
        }
        
        return null;
    }

    const checkDraw = () => {
        if (isFull()){
            turn = document.getElementById("turn");
            turn.textContent = "Draw";
            restartGame();
            return true;
        }
    }
    //checks if the board is full
    const isFull = () => {
        const gameBoard = board.getBoard();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (gameBoard[i][j].getStatus() === 0) {
                    return false;
                }
            }
        }
        return true;
    }

    const restartGame = () => {
        turn = document.getElementById("turn");
        const gameBoard = board.getBoard();
        
        const restartBtn = document.createElement("button");
        restartBtn.textContent = "Restart";
        restartBtn.addEventListener("click", function(event) {
            for (let i = 0; i < 3; i++){
                for (let j = 0; j < 3; j++){
                    gameBoard[i][j].tick(0);
                    
                }
            }
            restartBtn.remove();
            loadBoard();
        });
        turn.appendChild(restartBtn);
    }


    return {
        loadBoard,
        inputName
    };
}

gameController = gameControl();
gameController.inputName();
