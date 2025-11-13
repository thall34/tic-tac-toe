function createPlayer (name, marker) {
    return {
        name: name,
        marker: marker
    }
}

function drawBoard() {
    const grid = [];
    for (let i = 0; i < 3; i++) {
        grid[i] = [];
        for (let j = 0; j < 3; j++) {
            grid[i][j] = `(${i},${j})`
        };
    };
    return {grid};
};

function gamePlay () {
    const player1 = createPlayer("Tyler", "X");
    const player2 = createPlayer("Amber", "O");
    let currentPlayer = player2;
    let roundCount = 0
    let winCondition = false;
    const gameBoard = drawBoard();
    const grid = gameBoard.grid;

    function switchPlayer(current) {
        if (current === player1) {
            return current = player2;
        } else if (current === player2) {
            return current = player1;
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

    function gameRound(player) {

        function addMarker(player, in1, in2) {
            if (grid[in1][in2] === "X" || grid[in1][in2] === "O") {
                console.log("Pick a different spot")
                cellFull = true;
            } else {
                grid[in1][in2] = player.marker;
                cellFull = false;
            }
        };

        let cellFull = true;

        console.log(`${player.name} is up`)

        while (cellFull === true) {
            let X = prompt("Enter a horizontal grid point");
            let Y = prompt("Enter a vertical grid point");
            addMarker(player, X, Y);
        };
        
        roundCount += 1
    };

    while (winCondition === false && roundCount < 9) {
        currentPlayer = switchPlayer(currentPlayer)
        gameRound(currentPlayer);
        console.log(gameBoard)
        checkWin(currentPlayer);
    };

    if (winCondition === true) {
        console.log(`${currentPlayer.name} is the Winner!`)
    } else {
        console.log("Tie Game!")
    };
};

gamePlay();