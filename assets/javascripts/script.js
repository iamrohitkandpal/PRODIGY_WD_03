const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

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
let options = ["", "", "", "", "", "", "", "", "", "",];
let currentPlayer = "X";
let running = false;

startGame();

function startGame(){
    cells.forEach(cell => cell.addEventListener("click", cellTouched));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s Turn`;
};
function cellTouched(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){

    }
};
function changePlayer(){

};
function restartGame(){

};
function winnerCheck(){

};
function updateCell(cell, index){

};