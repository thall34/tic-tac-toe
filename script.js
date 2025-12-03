function createPlayer(name, marker) { return { name, marker } }

function gameBoardFactory() {
    const container = document.getElementById("container");

    const grid = [
        ["0", "0", "0"],
        ["0", "0", "0"],
        ["0", "0", "0"]
    ];
    
    function reset(){
        const cells = document.querySelectorAll(".cell");
        
        cells.forEach((cell, i)=>{
            const rowIndices = Number(cell.dataset.row);
            const colIndices = Number(cell.dataset.col);
            
            cell.textContent = "";
            grid[rowIndices][colIndices] = "0";
        });
    }
    
    return {
        grid,
        reset
    }
}

function Game(playerX, playerO) {
    const gameBoard = gameBoardFactory();
    const grid = gameBoard.grid;
    const display = document.getElementById("display");
    const cells = document.querySelectorAll(".cell");
    
    const player1 = createPlayer(playerX, "X");
    const player2 = createPlayer(playerO, "O");

    let activePlayer = player1;
    let winCondition = false;
    let roundCount = 0;
    
    function tileClickHandler(event){
        const clickedCell = event.target;
        const row = Number(clickedCell.dataset.row);
        const col = Number(clickedCell.dataset.col);

        clickedCell.style.cursor = "default";

        if (winCondition === false && roundCount < 9) {
            if (grid[row][col] !== "0") {
                alert("already filled");
            } else {
                clickedCell.textContent = activePlayer.marker;
                grid[row][col] = activePlayer.marker;

                checkWin(activePlayer);
                roundCount += 1;

                if (winCondition === true) {
                    display.textContent = `${activePlayer.name} is the Winner!`;
                } else if (winCondition === false && roundCount === 9) {
                    display.textContent = "Tie Game!";
                } else {
                    playerSwitch(activePlayer);
                    display.textContent = `${activePlayer.name} please pick a cell`;
                }
            }
        }
    }

    function playerSwitch() {
        if (activePlayer === player1) {
            activePlayer = player2;
        } else if (activePlayer === player2) {
            activePlayer = player1;
        }
    }

    function checkWin(player) {
        // checks horizontal
        if (grid[0][0] === player.marker && grid[0][1] === player.marker && grid[0][2] === player.marker) {
            winCondition = true;
        } else if (grid[1][0] === player.marker && grid[1][1] === player.marker && grid[1][2] === player.marker) {
            winCondition = true;
        } else if (grid[2][0] === player.marker && grid[2][1] === player.marker && grid[2][2] === player.marker) {
            winCondition = true;
            // checks vertical
        } else if (grid[0][0] === player.marker && grid[1][0] === player.marker && grid[2][0] === player.marker) {
            winCondition = true;
        } else if (grid[0][1] === player.marker && grid[1][1] === player.marker && grid[2][1] === player.marker) {
            winCondition = true;
        } else if (grid[0][2] === player.marker && grid[1][2] === player.marker && grid[2][2] === player.marker) {
            winCondition = true;
            // checks diagonal
        } else if (grid[0][0] === player.marker && grid[1][1] === player.marker && grid[2][2] === player.marker) {
            winCondition = true;
        } else if (grid[2][0] === player.marker && grid[1][1] === player.marker && grid[0][2] === player.marker) {
            winCondition = true;
        }
    }
    
    function removeTileListeners(){
        cells.forEach((cell, i)=> {
            cell.removeEventListener("click", tileClickHandler);
            cell.style.cursor = "default";
        });
    }
    
    function updateNames(NewPlayer1Name, newPlayer2Name){
        player1.name = NewPlayer1Name;
        player2.name = newPlayer2Name;
    }
    
    function reset(){
        display.textContent = `Please input your names below`;
        activePlayer = player1;
        winCondition = false;
        roundCount = 0;
        gameBoard.reset();
        removeTileListeners();
    }
    

    function startMatch() {
        const display = document.getElementById("display");
        
        display.textContent = `${activePlayer.name} please pick a cell`

        cells.forEach((cell, i) => {
            const rowIndices = Math.floor(i / 3);
            const colIndices = Math.floor(i % 3);

            cell.style.cursor = "pointer";
            cell.dataset.row = String(rowIndices);
            cell.dataset.col = String(colIndices);
            cell.addEventListener("click", tileClickHandler);
        });
    }

    return {
        startMatch,
        reset,
        updateNames
    }
}

function startGame() {
    const button = document.getElementById("button");
    const player1Input = document.getElementById("player1");
    const player2Input = document.getElementById("player2");
    const game = Game(player1Input.value, player2Input.value);

    button.style.cursor = "pointer";
    
    button.addEventListener("click", () => {
        if (button.classList.contains("start")) {
            game.updateNames(player1Input.value, player2Input.value);
            game.startMatch();
            button.classList.remove("start");
            button.classList.add("reset");
            button.textContent = "Reset";
        } else if (button.classList.contains("reset")) {
            game.reset();
            button.classList.remove("reset");
            button.classList.add("start");
            button.textContent = "Start";
        }
    });
}

startGame(); // we need to remove the event listeners, for this we have two options: 1) use a single listenre on the container then use event.target to get the actual element being clicked 