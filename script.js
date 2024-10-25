let questions = [
    {
        clues: ["Sun", "Mercury", "Venus", "Earth"],
        answer: "Planets in order from the Sun",
        keywords: ["planets", "sun", "solar system", "order"]
    },
    {
        clues: ["Oliver", "Max", "Jesse", "Laurence"],
        answer: "Members of the Gergel family",
        keywords: ["gergel", "family", "gergels"]
    },
    {
        clues: ["Red", "Blue", "Yellow", "Green"],
        answer: "Colors in the Olympic Rings",
        keywords: ["olympic", "rings", "colors"]
    },
    // Add more questions here...
];

let currentQuestionIndex = 0;
let currentClueIndex = 0;
let score = 0;
let timer;
const timeLimit = 60; // seconds

const startButton = document.getElementById('start-button');
const nextClueButton = document.getElementById('next-clue-button'); // New button reference
const submitGuessButton = document.getElementById('submit-guess-button');
const playAgainButton = document.getElementById('play-again-button');
const clueTextContainer = document.getElementById('clues');
const resultText = document.getElementById('result-text');
const guessInput = document.getElementById('guess');
const clueScreen = document.getElementById('clue-screen');
const resultScreen = document.getElementById('result-screen');
const introScreen = document.getElementById('intro-screen');
const scoreDisplay = document.getElementById('current-score');
const timeDisplay = document.getElementById('time-remaining');

function startGame() {
    score = 0;
    currentQuestionIndex = Math.floor(Math.random() * questions.length);
    currentClueIndex = 0;
    scoreDisplay.textContent = score;
    clueTextContainer.innerHTML = '';
    timeDisplay.textContent = timeLimit;
    revealClue();
    startTimer();
    introScreen.classList.add('hidden');
    clueScreen.classList.remove('hidden');
}

function setupClues() {
    clueTextContainer.innerHTML = ''; // Clear previous clues
    const clues = questions[currentQuestionIndex].clues;
    
    clues.forEach(() => {
        const clue = document.createElement('p');
        clue.classList.add('hidden'); // Initially hide clues
        clueTextContainer.appendChild(clue);
    });
}

function startTimer() {
    let timeRemaining = timeLimit;
    timer = setInterval(() => {
        timeRemaining--;
        timeDisplay.textContent = timeRemaining;
        if (timeRemaining <= 0) {
            clearInterval(timer);
            endRound("Time's up! The answer was: " + questions[currentQuestionIndex].answer);
        }
    }, 1000);
}

function revealClue() {
    if (currentClueIndex < questions[currentQuestionIndex].clues.length) {
        const clue = document.createElement('p');
        clue.textContent = questions[currentQuestionIndex].clues[currentClueIndex];
        clueTextContainer.appendChild(clue);
        currentClueIndex++;
    } else {
        nextClueButton.disabled = true;  // Disable the button after the last clue
    }
}

function submitGuess() {
    const userAnswer = guessInput.value.trim().toLowerCase();
    const correctKeywords = questions[currentQuestionIndex].keywords;
    clearInterval(timer);

    // Check if userAnswer contains any keyword from the correctKeywords array
    const isCorrect = correctKeywords.some(keyword => userAnswer.includes(keyword));

    if (isCorrect) {
        score += (5 - currentClueIndex) * 10;  // More points if guessed with fewer clues
        scoreDisplay.textContent = score;
        endRound("Correct! Great job.");
    } else {
        endRound(`Wrong! The correct answer was: ${questions[currentQuestionIndex].answer}`);
    }
}

function endRound(message) {
    resultText.textContent = message;
    clueScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
}

// Event Listeners
startButton.addEventListener('click', startGame);
nextClueButton.addEventListener('click', revealClue); // Connect button to revealClue function
submitGuessButton.addEventListener('click', submitGuess);
playAgainButton.addEventListener('click', () => {
    resultScreen.classList.add('hidden');
    startGame();
});
