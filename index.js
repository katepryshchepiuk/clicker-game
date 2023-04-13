//Set maximum amount of levels per game
const maxLevel = 5;

// Initialize score, level, and target clicks per 1st level
let score = 0;
let level = 1;
let targetClicks = 8;

// Get DOM elements
const scoreElement = document.getElementById("score");
const levelElement = document.getElementById("level");
const clickButton = document.getElementById("click-button");

const messageAlert = document.getElementById("message-alert");
const messageElement = document.getElementById("message-element");
const nextLevelButton = document.getElementById("next-level");
const startAgainButton = document.getElementById("start-again");

// Hide message alert by default
messageAlert.style.display = "none";

// Increment score and update score element, then call level handler function
function incrementHandler() {
    score++;
    scoreElement.textContent = score;
    //Call level upgrade function
    levelHandler();
}

// Handle click button click event
clickButton.addEventListener("click", incrementHandler);

// Messages
const nextLevelMessage = (level, score) => `Level ${level}. Your score is ${score}.`;
const winMessage = (score) => `You have won the game! Your score is ${score}.`;

// Check if level should be increased or game should end
function levelHandler() {
    if (level < maxLevel && score >= targetClicks) {
        level++;
        levelElement.textContent = level;
        //Increase target clicks at next level in 2 times
        targetClicks *= 2;
        // Show "next level" message
        showMessage(nextLevelMessage(level, score), true, false);
    } else if (level === maxLevel && score >= targetClicks) {
        // Show "win" message
        showMessage(winMessage(score), false, true);
    }
}

// Show message alert with given message and button according to message type
function showMessage(message, showNextLevelButton, showStartAgainButton) {
  messageAlert.style.display = "block";

  messageElement.textContent = message;

  nextLevelButton.style.display = showNextLevelButton ? "block" : "none";
  startAgainButton.style.display = showStartAgainButton ? "block" : "none";
  
  clickButton.disabled = true;
}

// Hide "next level" message alert and enable click button when next level button is clicked
nextLevelButton.addEventListener("click", hideMessage);

function hideMessage() {
  messageAlert.style.display = "none";
  clickButton.disabled = false;
}

// Hide "win" message alert and reset game when start again button is clicked

startAgainButton.addEventListener("click", startAgain);

function startAgain() {
  hideMessage();
  
  score = 0;
  level = 1;
  targetClicks = 8;
  
  levelElement.textContent = 1;
  scoreElement.textContent = 0;
}


