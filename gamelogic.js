// rules modal logic
const openModal_Button = document.querySelector(".rules-button");
const closeModalButtons = document.querySelectorAll(".close-rules-icon");
const ruleModal = document.querySelector(".rules-main-container");

openModal_Button.addEventListener("click", () => {
    ruleModal.style.display = "grid";
});
closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
        ruleModal.style.display = "none";
    });
});

// use local storage count onload to keep the game score
window.addEventListener("load", () => {
    const scoreBoard = document.querySelector(".score");
    
    scoreBoard.innerText = parseInt(localStorage.getItem("game-score"));
});

// restart game
const restartButton = document.querySelector(".winning-message-container button");

restartButton.addEventListener("click", () => {
    const choiceButtons_Section = document.querySelector(".choice-buttons-container");
    choiceButtons_Section.style.display = "grid";
    const choiceSection = document.querySelector(".choice-section");
    choiceSection.style.display = "none";

    const winnerBoard = document.querySelector(".winning-message-container");
    winnerBoard.style.visibility = "hidden";

    const userChoicePlaceholder = document.querySelector(".user-choice-placeholder");
    userChoicePlaceholder.style.display = "grid";

    const allChoices = document.querySelectorAll(".all-choices");
    allChoices.forEach((choice) => {
        choice.style.visibility = "hidden";
    });

    generateUserWinning_BoxShadow("none");
    generateAiWinning_BoxShadow("none");
});

// game logic
const choiceButtons = document.querySelectorAll(".choice-button-JS");
choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
        // to generate ai choice
        const randomIndex = Math.floor(Math.random() * 3);

        showNewSection();
        showUserChoice(button);
        showAiChoice(randomIndex);
        checkForWinner(button, randomIndex);
    });
});

const userChoices = document.querySelectorAll(".user-choice-container .choice-button");
const aiChoices = document.querySelectorAll(".ai-choice-container .choice-button");

function showNewSection() {
    // remove choice buttons and show choicesection also remove choice placeholder
    const choiceButtons_Section = document.querySelector(".choice-buttons-container");
    choiceButtons_Section.style.display = "none";
    const choiceSection = document.querySelector(".choice-section");
    choiceSection.style.display = "grid";

    const userChoicePlaceholder = document.querySelector(".user-choice-placeholder");
    userChoicePlaceholder.style.display = "none";
}

function showUserChoice(button) {
    if(button.classList.contains("choice-button-paper")){
        userChoices[0].style.visibility = "visible";
    }
    if(button.classList.contains("choice-button-scissors")){
        userChoices[1].style.visibility = "visible";
    }
    if(button.classList.contains("choice-button-rock")){
        userChoices[2].style.visibility = "visible";
    }
}

function showAiChoice(randomIndex) {
    setTimeout(() => {
        aiChoices[randomIndex].style.visibility = "visible";
    },1000)
}

let count = parseInt(localStorage.getItem("game-score"));
function checkForWinner(button, randomIndex) {
    // first show the board
    const winnerBoard = document.querySelector(".winning-message-container");
    const winningMessage = document.querySelector(".winning-message-container p");
    const scoreBoard = document.querySelector(".score");

    setTimeout(() => {
        winnerBoard.style.visibility = "visible";

        //check for a draw
        if(button.classList.contains("choice-button-paper") && randomIndex == 0){
            winningMessage.innerText = "DRAW";
        }
        if(button.classList.contains("choice-button-scissors") && randomIndex == 1){
            winningMessage.innerText = "DRAW";
        }
        if(button.classList.contains("choice-button-rock") && randomIndex == 2){
            winningMessage.innerText = "DRAW";
        }


        //check winner
        if(button.classList.contains("choice-button-paper") && randomIndex == 1){
            winningMessage.innerText = "YOU LOSE";
            generateAiWinning_BoxShadow("0px 0px 0px 40px #80808026, 0px 0px 0px 80px #8080801a, 0px 0px 0px 120px #8080800a");
        }
        if(button.classList.contains("choice-button-paper") && randomIndex == 2){
            winningMessage.innerText = "YOU WIN";
            scoreBoard.innerText = count += 1;
            generateUserWinning_BoxShadow("0px 0px 0px 40px #80808026, 0px 0px 0px 80px #8080801a, 0px 0px 0px 120px #8080800a");
        }

        if(button.classList.contains("choice-button-scissors") && randomIndex == 2){
            winningMessage.innerText = "YOU LOSE";
            generateAiWinning_BoxShadow("0px 0px 0px 40px #80808026, 0px 0px 0px 80px #8080801a, 0px 0px 0px 120px #8080800a");
        }
        if(button.classList.contains("choice-button-scissors") && randomIndex == 0){
            winningMessage.innerText = "YOU WIN";
            scoreBoard.innerText = count += 1;
            generateUserWinning_BoxShadow("0px 0px 0px 40px #80808026, 0px 0px 0px 80px #8080801a, 0px 0px 0px 120px #8080800a");
        }

        if(button.classList.contains("choice-button-rock") && randomIndex == 0){
            winningMessage.innerText = "YOU LOSE";
            generateAiWinning_BoxShadow("0px 0px 0px 40px #80808026, 0px 0px 0px 80px #8080801a, 0px 0px 0px 120px #8080800a");
        }
        if(button.classList.contains("choice-button-rock") && randomIndex == 1){
            winningMessage.innerText = "YOU WIN";
            scoreBoard.innerText = count += 1;
            generateUserWinning_BoxShadow("0px 0px 0px 40px #80808026, 0px 0px 0px 80px #8080801a, 0px 0px 0px 120px #8080800a");
        }


        // add game-score to local storage
        localStorage.setItem("game-score", scoreBoard.innerText);
        
    },1500)
}

function generateUserWinning_BoxShadow(shadow) {
    const allUserChoices = document.querySelectorAll(".user-choice-container .choice-button");
    allUserChoices.forEach((choice) => {
        choice.style.boxShadow = shadow;
    });
}
function generateAiWinning_BoxShadow(shadow) {
    const allAiChoices = document.querySelectorAll(".ai-choice-container .choice-button");
    allAiChoices.forEach((choice) => {
        choice.style.boxShadow = shadow;
    });
}