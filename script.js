function getComputerChoice() {
    let num = Math.floor(Math.random() * 3);

    switch (num){
        case 0:
            return "Rock";
        case 1:
            return "Paper";
        case 2:
            return "Scissors";
        
        default: 
            return "Error";
    }
}

function playRound(playerSelection, computerSelection){
    if (computerSelection === "Error") {
        console.log("There was an unexpected error!");
        return;
    }

    let loosingMsg = `${computerSelection} beats ${playerSelection[0].toUpperCase() + playerSelection.slice(1)}. Computer gains a point`;
    let winningMsg = `${playerSelection[0].toUpperCase() + playerSelection.slice(1)} beats ${computerSelection}. You gain a point`;
    let drawMsg = `Both used ${computerSelection}! It's a Draw!`;

    if (playerSelection.toLowerCase() === computerSelection.toLowerCase()) {
        console.log(drawMsg)
        return "Draw";
    }

    if (playerSelection.toLowerCase() === "rock") {
        console.log((computerSelection === "Paper") ? loosingMsg : winningMsg);
        return (computerSelection === "Paper") ? "Lose":"Win";
    }
    if (playerSelection.toLowerCase() === "paper") {
        console.log((computerSelection === "Scissors") ? loosingMsg : winningMsg);
        return (computerSelection === "Scissors") ? "Lose":"Win";
    }
    if (playerSelection.toLowerCase() === "scissors") {
        console.log((computerSelection === "Rock") ? loosingMsg : winningMsg);
        return (computerSelection === "Rock") ? "Lose":"Win";
    }
}

function game(e) {
    let computerSelection = getComputerChoice();
    let playerSelection = e.target.getAttribute('id');

    const msg = document.createElement('p');
    msg.classList.add('msg');

    let status = playRound(playerSelection, computerSelection);

    if (status === "Draw") {
        msg.textContent = `Both used ${computerSelection}! It's a Draw!`;
        comp_score = (status === "Lose") ? comp_score+1:comp_score;
    } else if (status === "Win") {
        player_score++;
        msg.textContent = `${playerSelection[0].toUpperCase() + playerSelection.slice(1)} beats ${computerSelection}. You gain a point`;
    } else if (status === "Lose") {
        comp_score++;
        msg.textContent = `${computerSelection} beats ${playerSelection[0].toUpperCase() + playerSelection.slice(1)}. Computer gains a point`;
    }

    result.textContent = ` Player Score: ${player_score}` + `\n Computer Score: ${comp_score}`;

    result.appendChild(msg);

    const finalMsg = document.createElement('h2');
    finalMsg.classList.add('finalMsg');

    if (player_score === 5) {
        finalMsg.textContent = "You Win!";
    } else if (comp_score === 5) {
        finalMsg.textContent = "You Lose!";
    }

    result.appendChild(finalMsg);


    // Ending the Game
    if (player_score === 5 || comp_score === 5) {
        btnUserChoices.forEach(btn => btn.removeEventListener('click', game))
    }
}

const btnUserChoices = document.querySelectorAll('.userChoice');
const result = document.querySelector('.result');

let player_score = 0;
let comp_score = 0;

btnUserChoices.forEach(btn => btn.addEventListener('click', game));
