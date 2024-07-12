const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const audio = document.getElementById("myAudio");


const winTerms = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let options = ["", "", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

startGame();

function startGame(){
    cells.forEach(cell => cell.addEventListener("click", cellTouched));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s Turn`;
    running = true;
};
function cellTouched(){
    // if (running) audio.play();
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    winnerCheck();
    if (running && currentPlayer === "O") {
        setTimeout(aiMove, 500);  // Delay AI move for better UX
    }
};
function changePlayer(){
    currentPlayer = currentPlayer == "X" ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s Turn`;
};
function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
};
function winnerCheck(){
    let winner = false;

    for (let i = 0; i < winTerms.length; i++) {
        const term = winTerms[i];
        const cellA = options[term[0]];
        const cellB = options[term[1]];
        const cellC = options[term[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            winner = false;
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            winner = true;
            break;
        }
    }

    if (winner) {
        statusText.textContent = `${currentPlayer} is the winner!`;
        running = false;
    } else if (!options.includes("")) {
        statusText.textContent = `It's a Draw!`;
        running = false;
    } else {
        changePlayer();
        console.log("Halwa Baadme");
    }
};
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
};

function aiMove() {
    let emptyCells = [];
    for (let i = 0; i < options.length; i++) {
        if (options[i] === "") {
            emptyCells.push(i);
        }
    }

    // Check for a winning move
    for (let i = 0; i < winTerms.length; i++) {
        const [a, b, c] = winTerms[i];
        if (options[a] === "O" && options[b] === "O" && options[c] === "") {
            updateCell(cells[c], c);
            winnerCheck();
            return;
        }
        if (options[a] === "O" && options[b] === "" && options[c] === "O") {
            updateCell(cells[b], b);
            winnerCheck();
            return;
        }
        if (options[a] === "" && options[b] === "O" && options[c] === "O") {
            updateCell(cells[a], a);
            winnerCheck();
            return;
        }
    }

    // Check for a blocking move
    for (let i = 0; i < winTerms.length; i++) {
        const [a, b, c] = winTerms[i];
        if (options[a] === "X" && options[b] === "X" && options[c] === "") {
            updateCell(cells[c], c);
            winnerCheck();
            return;
        }
        if (options[a] === "X" && options[b] === "" && options[c] === "X") {
            updateCell(cells[b], b);
            winnerCheck();
            return;
        }
        if (options[a] === "" && options[b] === "X" && options[c] === "X") {
            updateCell(cells[a], a);
            winnerCheck();
            return;
        }
    }

    // If no winning or blocking move, pick a random empty cell
    if (emptyCells.length > 0) {
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const cell = cells[randomIndex];
        updateCell(cell, randomIndex);
        winnerCheck();
    }
};