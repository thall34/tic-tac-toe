function playerFactory() {
    const players = [];

    function createPlayer(name, marker) {
        const player = {
            name: name,
            marker: marker,
        };

        players.push(player);
    };

    return {
        players: players,
        createPlayer: createPlayer
    };
};

function gameBoardFactory() {
    const container = document.getElementById("container");

    const grid = [
        ["0", "0", "0"],
        ["0", "0", "0"],
        ["0", "0", "0"]
    ];

    function printGrid() {
        container.innerHTML = "";
        for (let row = 0; row < grid.length; row++) {
            const rowDiv = document.createElement("div");
            rowDiv.classList.add("row");
            for (let col = 0; col < grid[row].length; col++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.textContent = "";

                rowDiv.appendChild(cell);
            };
            container.appendChild(rowDiv);
        };
    };

    return {
        grid: grid,
        printGrid: printGrid
    }
};

function gameFlow(playerX, playerO) {
    const getPlayer = playerFactory();
    const gameBoard = gameBoardFactory();
    const grid = gameBoard.grid;
    const player1 = getPlayer.createPlayer(playerX, "X", "1");
    const player2 = getPlayer.createPlayer(playerO, "O", "2");

    let activePlayer = getPlayer.players[0];
    let winCondition = false;
    let roundCount = 0;

    function playerSwitch() {
        if (activePlayer === getPlayer.players[0]) {
            activePlayer = getPlayer.players[1];
        } else if (activePlayer === getPlayer.players[1]) {
            activePlayer = getPlayer.players[0];
        };
    };

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
        };
    };

    function fullGame() {
        const cells = document.querySelectorAll("div.cell");
        const display = document.getElementById("display");

        display.textContent = `${activePlayer.name} please pick a cell`

        cells.forEach(cell => {
            cell.addEventListener("click", (event) => {
                const clickedCell = event.target;
                const row = parseInt(clickedCell.dataset.row);
                const col = parseInt(clickedCell.dataset.col);

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
                        };
                    };
                };
            });
        });
    };

    return {
        fullGame: fullGame,
    }
};

function displayGame() {
    const button = document.getElementById("button");
    const player1Input = document.getElementById("player1");
    const player2Input = document.getElementById("player2");
    const display = document.getElementById("display");
    const board = gameBoardFactory();
    const players = playerFactory();


    board.printGrid();

    button.addEventListener("click", () => {
        if (button.classList.contains("start")) {
            const game = gameFlow(player1Input.value, player2Input.value);
            game.fullGame();
            button.classList.remove("start");
            button.classList.add("reset");
            button.textContent = "Reset";
        } else if (button.classList.contains("reset")) {
            const game = gameFlow();
            board.grid = [
                ["0", "0", "0"],
                ["0", "0", "0"],
                ["0", "0", "0"]
            ];
            board.printGrid();
            players.players = [];
            game.winCondition = false;
            game.roundCount = 0;
            button.classList.remove("reset");
            button.classList.add("start");
            button.textContent = "Start";
            player1Input.value = "";
            player2Input.value = "";
            display.textContent = `Please input your names below`;
        };
    });
};

displayGame();