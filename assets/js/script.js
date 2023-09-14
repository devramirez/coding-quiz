// Intro Section
var timerTag = document.querySelector(`#timerTag`);
var timerPTag  = document.querySelector(`header`).children[1];
var submitHighscoreBtn = document.querySelector(`#submitHighscoreBtn`);
var viewHighscoresBtn = document.querySelector(`#viewHighscoresBtn`); 
var clearHighscoreBtn = document.querySelector(`#clearHighscoreBtn`);
var answerButtonLst = document.body.querySelector(`ul`);
var goBackHighscoreBtn = document.querySelector(`#goBackBtn`);
var startBtn = document.querySelector(`#startBtn`);
var titleTag = document.querySelector(`#title`)

// questions & answers section
var questions = {
    questions: [
        `1. How do you create a function in JavaScript?`,
        `2. Arrays use _____ at the start and end`,
        `3. What do you use for 'strict' equality?`,
        `4. The first index of an array starts at:`,
    ],
    answers: [
        [`function = myFunction()`, `myFunction()`, `var = myFunction()`, `correct:function myFunction()`],
        [` ()`, `{}`, `correct:[]`, `<>`],
        [`!=`, `==`, `+=`, `correct:===`],
        [`correct:0`, `1`, `2`, `3`, `4`],
    ]
}

var globalTimerPreset = 60;
var questionIndexNumber = 0;
var timeLeft = globalTimerPreset;
var score = 0;
var gameEnded = true;

function setUpGame() {
    timeLeft = globalTimerPreset;
    timerTag.textContent = globalTimerPreset;

    document.querySelector(`#display-highscore-div`).style.display = `none`;
    titleTag.textContent = `Coding Quiz Challenge`;

    titleTag.style.display = `block`;
    document.querySelector(`#instructions`).style.display = `block`;
    viewHighscoresBtn.style.display = `block`; // 
    startBtn.style.display = `block`; // shows start button

    return;
}

// start quiz
function startQuiz() {
    gameEnded = false;
    questionIndexNumber = 0

    viewHighscoresBtn.style.display = `none`
    startBtn.style.display = `none`;
    document.querySelector(`#instructions`).style.display = `none`;
    timerPTag.style.display = `block`;

    showQuestions(questionIndexNumber);
    startTimer();
}

// Function to countdown
function countDown() {
    var timerInterval = setInterval(function () {
        if(gameEnded === true){
            clearInterval(timerInterval);
            return;
        }
        if (timeLeft < 1) {
            clearInterval(timerInterval);
            timeLeft.textContent = "Time's up!";
            gameEnded.textContent = "Game Over"
            endGame();
        } 

        timerTag.textContent = timeLeft;
        timeLeft--;
        
    }, 1000);

    return;
}

// present the questions and answers
function showQuestions(currentQuestionIndex) {
 titleTag.textContent = questionObj.questions[currentQuestionIndex];
 createAnswerElements(currentQuestionIndex)

 return;
}

function createAnswerElements(currentQuestionIndex){
    answerButtonLst.innerHTML = '';

    for(let answerIndex = 0; answerIndex < questionObj.answers[currentQuestionIndex].length; answerIndex++);
    if (questionObj.answers[currentQuestionIndex][answerIndex].includes(`correct:`)) {
        tempStr = questionObj.answers[currentQuestionIndex][answerIndex].substring(8, questionObj.answers[currentQuestionIndex][answerIndex].length);
        currentAnswerListItem.id = `correct`;
    }
    return;
}

function nextQuestion() {
    questionIndexNumber++;
    if (questionIndexNumber >= questionObj.questions.length) {
        endGame();
    } else {
        showQuestions(questionIndexNumber);
    }
    return;
}

function endGame() {
    gameEnded = true;
    score = timeLeft;

    timerPTag.style.display = `none`
    titleTag.style.display = `none`
    answerButtonLst.innerHTML = ''

    document.querySelector(`#scoreSpan`).textContent = score;
    document.querySelector(`#submit-highscore-div`).style.display = `block`;

    return;
    
}