let turn = document.getElementById('current-turn');
let titleGame = document.getElementById('title');
let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let a = setInterval(function(){turn.innerHTML = ""}, 30000);
let b = setInterval(function(){restart()}, 30000);


// Inserting all board cells into the array
let boxes = Array.from(document.getElementsByClassName('box'));


// Get the computed of an element and return the value of the property:
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');
let drawIndicator = getComputedStyle(document.body).getPropertyValue('--draw-blocks');


// Creating the shapes of 'X' and 'O'
const O_shape = "O";
const X_shape = "X";


// Initializes which shape will start the game
let currentPlayer = X_shape;


// Resets all cells to be empty
let cells = Array(9).fill(null);
let count_plays = 0;


// Listens to every cell in the board
const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));

}



// Creating a function that receives an id and accordingly inserts the player's shape into the cell
function boxClicked(e) {
    const id = e.target.id;

    if(!cells[id] && count_plays < 9){

        cells[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if(currentPlayer == "X"){
            turn.innerHTML = "'O' It's Your Turn";

        }if(currentPlayer == "O"){
            turn.innerHTML = "'X' It's Your Turn";
        }
        
        // Win
        if(playerHasWon() !== false){   

            playerText.innerHTML = `'    ${currentPlayer}   ' You Are The Winner !`;
            titleGame.innerHTML = "";
            turn.innerHTML = "";

            let winning_blocks = playerHasWon()
            count_plays = 10;
            winning_blocks.map( box => boxes[box].style.backgroundColor = winnerIndicator);
       
            return;
        }
        count_plays++ 

        // Responsible for turns
        currentPlayer = currentPlayer == X_shape ? O_shape : X_shape
    }
        // Draw
        if(count_plays === 9){
            playerText.innerHTML = "Draw Game!"
            boxes.forEach(box => box.style.color = drawIndicator);
            titleGame.innerHTML = "";
            turn.innerHTML = "";
            playerText.style.color = "rgb(251, 4, 4)";
        }
}


// Creating an array with all the possible combinations for Winning
const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


// Creating a function that checks the values in the cells and checks if it matches one of 
// the combinations I created earlier in inningCombos
function playerHasWon() {

    for (const condition of winningCombos) {
        let [a, b, c] = condition;

        if(cells[a] && (cells[a] == cells[b] && cells[a] == cells[c])) {
            return [a,b,c];

        }

    }
    return false;

}


// Listens to the restart button
restartBtn.addEventListener('click', restart);


// Creating a function that restart the the game
function restart() {
    cells.fill(null);
    count_plays = 0;
    boxes.forEach( box => {
        turn.innerHTML = "The Game Restarted";
        box.innerText = '';
        box.style.backgroundColor='';
        box.style.color = '#4c76ff';
        playerText.style.color = "#4c76ff";
    })

    titleGame.innerHTML = "Welcome To The Game:";
    playerText.innerHTML = "Tic - Tac - Toe";

    currentPlayer = X_shape;
}

startGame();


// Hiding and showing objects
document.getElementById("restartBtn").style.visibility = "hidden";
document.getElementById("gameboard").style.visibility = "hidden";
document.getElementById("a").style.visibility = "visible";

document.getElementById("btn1").onclick = function() {  
    document.getElementById("restartBtn").style.visibility = "visible";
    document.getElementById("gameboard").style.visibility = "visible";
    document.getElementById("a").style.visibility = "hidden";
    document.getElementById("btn1").style.visibility = "hidden";
};