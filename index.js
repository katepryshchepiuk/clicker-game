const maxLevel = 5;

let score = 0;
let level = 1;
let targetClicks = 8;

const scoreElement = document.getElementById("score");
const levelElement = document.getElementById("level");
const clickButton = document.getElementById("click-button");

const messageAlert = document.getElementById("message-alert");
const messageElement = document.getElementById("message-element");
const nextLevelButton = document.getElementById("next-level");
const startAgainButton = document.getElementById("start-again");

messageAlert.style.display = "none";

function incrementHandler() {
    score++;
    scoreElement.textContent = score;

    currentLevel();
}

clickButton.addEventListener("click", incrementHandler);

function currentLevel() {
    if (level < maxLevel && score >= targetClicks) {
        level++;
        levelElement.textContent = level;

        targetClicks *= 2;

        levelMessage();
    } else if (level === maxLevel && score >= targetClicks) {
        winMessage();
    }
}

function levelMessage() {
  const messageText = `Level ${level}. Your score is ${score}.`;
  messageElement.textContent = messageText;

  messageAlert.style.display = "block";
  nextLevelButton.style.display = "block";
  startAgainButton.style.display = "none";
  
  clickButton.disabled = true;
}

nextLevelButton.addEventListener("click", hideMessage);

function hideMessage() {
  messageAlert.style.display = "none";
  clickButton.disabled = false;
}

function winMessage() {
  const messageText = `You have won the game! Your score is ${score}.`;
  messageElement.textContent = messageText;

  messageAlert.style.display = "block";
  nextLevelButton.style.display = "none";
  startAgainButton.style.display = "block";
  
  clickButton.disabled = true;
}

startAgainButton.addEventListener("click", startAgain);

function startAgain() {
  hideMessage();
  
  score = 0;
  level = 1;
  targetClicks = 8;
  
  levelElement.textContent = 1;
  scoreElement.textContent = 0;
}