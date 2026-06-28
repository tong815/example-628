const progressText = document.querySelector("#progress-text");
const progressBar = document.querySelector("#progress-bar");
const scoreText = document.querySelector("#score-text");
const questionText = document.querySelector("#question-text");
const optionsList = document.querySelector("#options-list");
const feedbackBox = document.querySelector("#feedback-box");
const feedbackTitle = document.querySelector("#feedback-title");
const feedbackText = document.querySelector("#feedback-text");
const nextButton = document.querySelector("#next-button");

let questions = [];
let currentIndex = 0;
let correctCount = 0;
let answeredCount = 0;
let hasAnsweredCurrent = false;

async function loadQuestions() {
  try {
    const response = await fetch("questions.json");

    if (!response.ok) {
      throw new Error("Could not load questions.");
    }

    questions = await response.json();
    renderQuestion();
  } catch (error) {
    questionText.textContent = "Questions could not be loaded.";
    progressText.textContent = "Please check questions.json.";
    optionsList.innerHTML = "";
  }
}

function renderQuestion() {
  const question = questions[currentIndex];
  hasAnsweredCurrent = false;

  progressText.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
  progressBar.style.width = `${((currentIndex + 1) / questions.length) * 100}%`;
  scoreText.textContent = `Correct: ${correctCount} / Answered: ${answeredCount}`;
  questionText.textContent = question.question;
  optionsList.innerHTML = "";
  feedbackBox.className = "feedback-box hidden";
  feedbackTitle.textContent = "";
  feedbackText.textContent = "";
  nextButton.disabled = true;
  nextButton.textContent = currentIndex === questions.length - 1 ? "Restart Quiz" : "Next Question";

  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "option-button";
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", () => handleAnswer(option, button));
    optionsList.appendChild(button);
  });
}

function handleAnswer(selectedOption, selectedButton) {
  if (hasAnsweredCurrent) {
    return;
  }

  const question = questions[currentIndex];
  const isCorrect = selectedOption === question.correctAnswer;
  hasAnsweredCurrent = true;
  answeredCount += 1;

  if (isCorrect) {
    correctCount += 1;
  }

  document.querySelectorAll(".option-button").forEach((button) => {
    button.disabled = true;

    if (button.textContent === question.correctAnswer) {
      button.classList.add("correct");
    }
  });

  if (!isCorrect) {
    selectedButton.classList.add("incorrect");
  }

  feedbackBox.className = `feedback-box ${isCorrect ? "correct" : "incorrect"}`;
  feedbackTitle.textContent = isCorrect ? "Correct!" : "Not quite.";
  feedbackText.textContent = question.explanation;
  scoreText.textContent = `Correct: ${correctCount} / Answered: ${answeredCount}`;
  nextButton.disabled = false;
}

function goToNextQuestion() {
  if (currentIndex === questions.length - 1) {
    currentIndex = 0;
    correctCount = 0;
    answeredCount = 0;
  } else {
    currentIndex += 1;
  }

  renderQuestion();
}

nextButton.addEventListener("click", goToNextQuestion);
loadQuestions();
