const form = document.querySelector("form");
let infoText = document.querySelector(".information-text");
let formSection = document.getElementById("login-form");
let createAccountAnchor = document.querySelector(".create-account-anchor");
let equalsButton = document.getElementById("equals-button");
let calculatorSection = document.querySelector(".calculator-section");
let submitAnswerButton = document.getElementById("submit-answer-button");
let timesButton = document.getElementById("times-button");
let divideButton = document.getElementById("divide-button");
let resultScreen = document.querySelector(".result-screen");
let plusButton = document.getElementById("plus-button");
let resultTitle = document.querySelector(".result-title");
let resultInfo = document.querySelector(".result-info");
let body = document.querySelectorAll("body");
let percentage = document.querySelector(".percentage")
let resultText = document.querySelector(".calculator-screen-text");
let resultScreenFalse = document.querySelector(".result-screen-false");
let resultTitleFalse = document.querySelector(".result-title-false");
let resultInfoFalse = document.querySelector(".result-info-false");
let resultScreenStep = document.querySelector(".result-screen-step");
let calculatorButtonSound = new Audio("./assets/sounds/button3.mp3");
let resultScreenMiss = document.querySelector(".result-screen-miss")
let allAttempts = 0;
let yaySound = new Audio("./assets/sounds/yay2.mp3");
let loseSound = new Audio("./assets/sounds/lose.mp3");
let evalResult;
let correctlySolved = 0; // Initialize counter
let nameValue = ""; // Declare nameValue outside the event listener
let miniDisclaimer = document.getElementById("mini-disclaimer");
let infoRating =
  (parseFloat(correctlySolved) / parseFloat(allAttempts)) * 100 || 0;

calculatorButtonSound.volume = 0.4;
form.addEventListener("submit", function (event) {
  // Prevent the default form submission
  event.preventDefault();

  // Get the value of the "name-input" field
  nameValue = document.querySelector("#name-input").value;
  // Update the information-text content with the welcome message
  let ageValue = document.querySelector(".age-input").value;
  let themeValue = document.getElementById("theme-select").value;
  console.log(ageValue, nameValue, themeValue);
  if (ageValue == "" || themeValue == "" || nameValue == "") {
    resultScreenMiss.style.display = "flex"
    formSection.style.display = "flex";
  } else {
    formSection.style.display = "none";
    miniDisclaimer.innerHTML = "Now you are good to go, Let's math together";
    infoText.innerHTML = `Welcome to kidCalc, ${nameValue}`;
    createAccountAnchor.innerHTML = "Try the calculator";
    calculatorSection.style.display = "flex";
    createAccountAnchor.setAttribute("href", "#calculator-section");
    if (themeValue === "red") {
      console.log("theme is red");
      document.body.classList.add("red");
    } else if (themeValue === "blue") {
      console.log("theme is blue ");
      document.body.classList.add("blue");
    } else if (themeValue === "pink") {
      console.log("theme is pink ");
      document.body.classList.add("pink");
    } else if (themeValue === "green") {
      console.log("theme is green ");
      document.body.classList.add("green");
    }

    // Calculate infoRating here
  }
});

function equalsFunction() {
  evalResult = resultText.innerHTML.replace(/&gt;/g, ">").replace(/&lt;/g, "<");
  lastActualResult = eval(evalResult);
  console.log(lastActualResult);
  if (
    isNaN(lastActualResult) ||
    lastActualResult === undefined ||
    !isFinite(lastActualResult)
  ) {
    alert("Oops! This equation isn't possible. Please try again.");
  } else if (lastActualResult === true) {
    resultScreen.style.display = "flex";
    resultTitle.innerHTML = "Great Job!";
    resultInfo.innerHTML = `The answer is ${lastActualResult}`;
    resultText.innerHTML = "";
    submitAnswerButton.style.display = "none";
    equalsButton.style.filter = "opacity(1)";
    equalsButton.style.pointerEvents = "auto";
    timesButton.style.filter = "opacity(1)";
    timesButton.style.pointerEvents = "auto";
    divideButton.style.filter = "opacity(1)";
    divideButton.style.pointerEvents = "auto";
    plusButton.style.filter = "opacity(1)";
    plusButton.style.pointerEvents = "auto";
    yaySound.play();
    correctlySolved++; // Increment counter
    allAttempts++;
    infoRating =
      (parseFloat(correctlySolved) / parseFloat(allAttempts)) * 100 || 0;
      infoText.innerHTML = `Welcome to kidCalc, ${nameValue}. You've solved ${correctlySolved} problems correctly. Your rating is <span class="percentage">${infoRating}%</span>`;
    } else if (lastActualResult === false) {
    resultScreenFalse.style.display = "flex";
    resultTitleFalse.innerHTML = "Try again!";
    resultInfoFalse.innerHTML = `The answer is ${lastActualResult}`;
    resultText.innerHTML = "";
    submitAnswerButton.style.display = "none";
    equalsButton.style.filter = "opacity(1)";
    equalsButton.style.pointerEvents = "auto";
    timesButton.style.filter = "opacity(1)";
    timesButton.style.pointerEvents = "auto";
    divideButton.style.filter = "opacity(1)";
    divideButton.style.pointerEvents = "auto";
    plusButton.style.filter = "opacity(1)";
    plusButton.style.pointerEvents = "auto";
    loseSound.play();
    allAttempts++;
    infoRating =
      (parseFloat(correctlySolved) / parseFloat(allAttempts)) * 100 || 0;
      infoText.innerHTML = `Welcome to kidCalc, ${nameValue}. You've solved ${correctlySolved} problems correctly. Your rating is <span class="percentage">${infoRating}%</span>`;
    } else {
    resultText.innerHTML = "";
    submitAnswerButton.style.display = "block";
    equalsButton.style.filter = "opacity(0.5)";
    equalsButton.style.pointerEvents = "none";
    timesButton.style.filter = "opacity(0.5)";
    timesButton.style.pointerEvents = "none";
    divideButton.style.filter = "opacity(0.5)";
    divideButton.style.pointerEvents = "none";
    plusButton.style.filter = "opacity(0.5)";
    plusButton.style.pointerEvents = "none";
    resultScreenStep.style.display = "flex";
  
  }
  updatePercentageColor();

}

function answerSubmit() {
  let answer = parseFloat(resultText.innerHTML);
  if (answer === lastActualResult) {
    resultScreen.style.display = "flex";
    resultTitle.innerHTML = "Great Job!";
    resultInfo.innerHTML = `The answer is ${lastActualResult}`;
    resultText.innerHTML = "";
    submitAnswerButton.style.display = "none";
    equalsButton.style.filter = "opacity(1)";
    equalsButton.style.pointerEvents = "auto";
    timesButton.style.filter = "opacity(1)";
    timesButton.style.pointerEvents = "auto";
    divideButton.style.filter = "opacity(1)";
    divideButton.style.pointerEvents = "auto";
    plusButton.style.filter = "opacity(1)";
    plusButton.style.pointerEvents = "auto";
    yaySound.play();
    allAttempts++;
    correctlySolved++; 
    infoRating =
      (parseFloat(correctlySolved) / parseFloat(allAttempts)) * 100 || 0;
      infoText.innerHTML = `Welcome to kidCalc, ${nameValue}. You've solved ${correctlySolved} problems correctly. Your rating is <span class="percentage">${infoRating}%</span>`;
    } else {
    resultScreenFalse.style.display = "flex";
    resultTitleFalse.innerHTML = "Try again!";
    resultInfoFalse.innerHTML = `The answer is ${lastActualResult}`;
    resultText.innerHTML = "";
    submitAnswerButton.style.display = "none";
    equalsButton.style.filter = "opacity(1)";
    equalsButton.style.pointerEvents = "auto";
    timesButton.style.filter = "opacity(1)";
    timesButton.style.pointerEvents = "auto";
    divideButton.style.filter = "opacity(1)";
    divideButton.style.pointerEvents = "auto";
    plusButton.style.filter = "opacity(1)";
    plusButton.style.pointerEvents = "auto";
    loseSound.play();
    allAttempts++;
    infoRating =
      (parseFloat(correctlySolved) / parseFloat(allAttempts)) * 100 || 0;
      infoText.innerHTML = `Welcome to kidCalc, ${nameValue}. You've solved ${correctlySolved} problems correctly. Your rating is <span class="percentage">${infoRating}%</span>`;
      console.log(allAttempts)
  }
  updatePercentageColor();

}

function closePrompt() {
  resultScreen.style.display = "none";
  resultScreenFalse.style.display = "none";
  resultScreenStep.style.display = "none";
  resultScreenMiss.style.display ="none"
  yaySound.pause();
  yaySound.currentTime = 0;

  loseSound.pause();
  loseSound.currentTime = 0;
}

function deleteLastCharacter() {
  let currentValue = resultText.innerText; // Use innerText instead of innerHTML
  resultText.innerText = currentValue.slice(0, -1); // Remove the last character
}
function updatePercentageColor() {
  // Access percentage element
  let percentage = document.querySelector(".percentage");

  // Get the numeric value from percentage innerHTML
  let rating = parseFloat(percentage.innerHTML);

  // Change color based on rating
  if (rating > 50) {
    percentage.style.color = "green";
  } else {
    percentage.style.color = "red";
  }
}