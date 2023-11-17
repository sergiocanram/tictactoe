const cells = document.querySelectorAll(".celda");
const textoEstado  = document.querySelector("#textoEstado");
const botonReiniciar = document.querySelector("#botonReiniciar");
const winConditions = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];

let options = ["","","","","","","","",""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
     cells.forEach(cell => cell.addEventListener("click", cellClicked))
     botonReiniciar.addEventListener("click", reiniciarJuego);
     textoEstado.textContent = `Le toca a ${currentPlayer} colocar ficha.`;
     running = true;
}

function cellClicked() {
     
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running) {
        return;
    }

    updateCell(this, cellIndex);

    checkWinner();

}

function updateCell(cell, index) {

    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    textoEstado.textContent = `Le toca a ${currentPlayer} colocar ficha.`;


}

function checkWinner(){
    let roundWon = false; 

    for(let i= 0 ; i <winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];       

        if(cellA == "" || cellB == "" || cellC == "") {
            continue;
        }

        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break; 
        }

    } //for

    if (roundWon) {
        textoEstado.textContent = `${currentPlayer} ha ganado! Enhorabuena! Qué máquina!!`;
        running = false;
    }
    else if (!options.includes("")){
        textoEstado.textContent = `Empate!!!Sois igual de buenos (O igual de malos)`;
        running = false;
    } else {
        changePlayer();
    }

}//function checkWinner

function reiniciarJuego() {
    currentPlayer = "X";
    options = ["","","","","","","","",""];
    textoEstado.textContent = `Le toca a ${currentPlayer} colocar ficha.`
    cells.forEach (cell => cell.textContent = "");
    running=true;
}