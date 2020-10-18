const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const progressBarFull = document.querySelector("#progressBarFull");
const scoreText = document.querySelector("#score");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// Questions Database //

let questions = [
  {
    question: "What’s a defining trait of a biplane?",
    choice1: "Two sets of wings",
    choice2: "Two sets of wheels",
    choice3: "Two pilots",
    choice4: "Two engines",
    answer: 1,
  },
  {
    question: "Which is the oldest airline in the world?",
    choice1: "Easy Jet",
    choice2: "American Airlines",
    choice3: "Air France",
    choice4: "KLM",
    answer: 4,
  },
  {
    question: "When was business class flying introduced?",
    choice1: "1954",
    choice2: "1962",
    choice3: "1979",
    choice4: "1991",
    answer: 3,
  },
  {
    question:
      "What is the color of the device used to record flight data in case of an accident?",
    choice1: "White",
    choice2: "Red",
    choice3: "Black",
    choice4: "Orange",
    answer: 4,
  },
  {
    question: "Who was the first aviator to break the sound barrier?",
    choice1: "Chuck Yeager",
    choice2: "John Glenn",
    choice3: "Howard Hughes",
    choice4: "Amelia Earhart",
    answer: 1,
  },
];

// Start Game //

const scorePoints = 100;
const maxQuestions = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > maxQuestions) {
        localStorage.setItem("mostRecentScore", score)
        return window.location.assign("./end.html")
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${maxQuestions}`;
    progressBarFull.style.width = `${(questionCounter/maxQuestions)*100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);

    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion ["choice" + number];
    })

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset["number"]

    // apply green or red style if the answer is correct or incorrect //
    let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(scorePoints)
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion()
    }, 1000)
  });
});

incrementScore = num => {
  score += num
  scoreText.innerText = score
};

startGame();