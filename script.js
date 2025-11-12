function createPlayer (name, marker) {
    return {
        name: name,
        score: 0,
        marker: marker
    }
}

function drawBoard() {
    const rows = 3;
    const columns = 3;
    const grid = [];
    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        for (let j = 0; j < columns; j++) {
            grid[i][j] = `(${i},${j})`
        };
    };
    return {grid};
};

function addMarker (player, in1, in2) {
    if (grid[in1][in2] === "X" || grid[in1][in2] === "O") {
        console.log("Pick a different spot")
    } else {
        grid[in1][in2] = player.marker;
        console.log(gameBoard)
    }
};

function switchPlayer(current) {
    if (current === player1) {
        return current = player2;
    } else if (current === player2) {
        return current = player1
    }
}

function checkWinHorizontal (player) {
    if (grid[0][0] === player.marker && grid [0][1] === player.marker && grid [0][2] === player.marker) {
        winCondition = true;
    } else if (grid[1][0] === player.marker && grid [1][1] === player.marker && grid [1][2] === player.marker) {
        winCondition = true;
    } else if (grid[2][0] === player.marker && grid [2][1] === player.marker && grid [2][2] === player.marker) {
        winCondition = true;
    };
};

function checkWinVertical (player) {
    if (grid[0][0] === player.marker && grid [1][0] === player.marker && grid [2][0] === player.marker) {
        winCondition = true;
    } else if (grid[0][1] === player.marker && grid [1][1] === player.marker && grid [2][1] === player.marker) {
        winCondition = true;
    } else if (grid[0][2] === player.marker && grid [1][2] === player.marker && grid [2][2] === player.marker) {
        winCondition = true;
    };
};

function checkWinDiagonal (player) {
    if (grid[0][0] === player.marker && grid [1][1] === player.marker && grid [2][2] === player.marker) {
        winCondition = true;
    } else if (grid[2][0] === player.marker && grid [1][1] === player.marker && grid [0][2] === player.marker) {
        winCondition = true;
    };
};

function gamePlay () {
    let currentPlayer = player2;

    while (winCondition === false) {
        currentPlayer = switchPlayer(currentPlayer)
        console.log(`${currentPlayer.name} is up`)
        let X = prompt("Enter a horizontal grid point");
        let Y = prompt("Enter a vertical grid point");
        addMarker(currentPlayer, X, Y);
        checkWinHorizontal(currentPlayer);
        checkWinVertical(currentPlayer);
        checkWinDiagonal(currentPlayer);
        checkTieGame();
    };

    console.log(`${currentPlayer.name} is the winner!`)
};

const gameBoard = drawBoard();
const grid = gameBoard.grid;
const player1 = createPlayer("Tyler", "X");
const player2 = createPlayer("Amber", "O");
let winCondition = false;

gamePlay();

// need functionality for a tie game
// need better functionality in the gamePlay to check for if a cell is already filled and replay that turn until an open spot is picked