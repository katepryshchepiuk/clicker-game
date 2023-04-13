// Get DOM elements
const registrationForm = document.getElementById("user-registration");
const game = document.getElementById("game");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");

// Validate input and display error message when input fields are blurred
nameInput.addEventListener("blur", validateName);
emailInput.addEventListener("blur", validateEmail);

function validateName() {
    const nameValue = nameInput.value.trim();

    if (nameValue === "") {
        nameError.textContent = "Name is required";
        nameInput.classList.add("error");
        return false;
    } else if (nameValue.length < 2) {
        nameError.textContent = "Name must be at least 2 characters long";
        nameInput.classList.add("error");
        return false;
    }

    return true;
}

function validateEmail() {
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

    if (emailValue === "") {
        emailError.textContent = "Email is required";
        emailInput.classList.add("error");
        return false;
    }  else if (!emailRegex.test(emailValue)) {
        emailError.textContent = "Please enter a valid email address";
        emailInput.classList.add("error");
        return false;
    }
    
    return true;
}

// Clear error messages when input fields are focused
nameInput.addEventListener("focus", clearNameError);

function clearNameError() {
    nameError.textContent = "";
    nameInput.classList.remove("error");
}

emailInput.addEventListener("focus", clearEmailError);

function clearEmailError() {
    emailError.textContent = "";
    emailInput.classList.remove("error");
}

//Submit registration form
registrationForm.addEventListener("submit", registrationSubmit);

function registrationSubmit(event) {
    // prevent default form submission
    event.preventDefault();

    if (validateName() && validateEmail()) {
      // Create user object with name and email properties
      const user = {
        name: nameInput.value,
        email: emailInput.value,
      };
      localStorage.setItem("user", JSON.stringify(user));
      
      registrationForm.reset();

      // Hide the registration form and show the game
      registrationForm.style.display = "none";
      game.style.display = "block";
    }
}




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


