// Get DOM elements
const registrationForm = document.getElementById("user-registration");
const registrationSection = document.getElementById("registration-section");
const gameSection = document.getElementById("game-section");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const userName = document.getElementById("logged-user");

const scoreElement = document.getElementById("score");
const levelElement = document.getElementById("level");
const clickButton = document.getElementById("click-button");
const enemyImage = document.getElementById("enemy-img");

const messageAlert = document.getElementById("message-alert");
const messageElement = document.getElementById("message-element");
const nextLevelButton = document.getElementById("next-level");
const startAgainButton = document.getElementById("start-again");

//Set maximum amount of levels per game
const maxLevel = 5;

// Initialize score, level, and target clicks per 1st level
let score = 0;
let level = 1;
let targetClicks = 8;

// Hide game section and message alert by default
messageAlert.style.display = "none";
gameSection.style.display = "none";

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
        nameError.textContent = "Name is too short";
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
        emailError.textContent = "Enter a valid email address";
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

      userName.textContent = user.name;
      
      // Hide the registration form and show the game
      registrationSection.style.display = "none";
      gameSection.style.display = "block";
    }
}

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
const nextLevelMessage = (level, score) => `<span class="text-yellow">Level ${level}</span> <br> Your score is ${score}`;
const winMessage = (score) => `<span class="text-yellow">You have won the game!</span> <br> Your score is ${score}`;

const imageUrls = [
    "/images/1enemy.svg", 
    "/images/2enemy.svg", 
    "/images/3enemy.svg", 
    "/images/4enemy.svg", 
    "/images/5enemy.svg",
];

// Update the current image for the new level
function updateImages() {
  const levelIndex = level - 1;
  currentImages = imageUrls[levelIndex];

  enemyImage.setAttribute("src", currentImages);
}

// Check if level should be increased or game should end
function levelHandler() {
    if (level < maxLevel && score >= targetClicks) {
        level++;
        levelElement.textContent = level;
        //Increase target clicks at next level in 2 times
        targetClicks *= 2;
        // Show "next level" message
        showMessage(nextLevelMessage(level, score), true, false);
        updateImages();
    } else if (level === maxLevel && score >= targetClicks) {
        // Show "win" message
        showMessage(winMessage(score), false, true);
    }
}

// Show message alert with given message and button according to message type
function showMessage(message, showNextLevelButton, showStartAgainButton) {
  messageAlert.style.display = "flex";

  messageElement.innerHTML = message;

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

  updateImages();
  
  levelElement.textContent = 1;
  scoreElement.textContent = 0;
}


