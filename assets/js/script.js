// Intro Section
var welcome = document.querySelector('#introduction');
var introPage = document.querySelector('#intro-page');
var startBtn = document.querySelector('#start-button');
// Question Section
var questionPage = document.querySelector('#question-page');
var questionAsk = document.querySelector('#question-ask');

// Answer Buttons
var reactButtons = document.querySelector('.choices');
var answerBtn1 = document.querySelector('#answer_btn1');
var answerBtn2 = document.querySelector('#answer_btn2');
var answerBtn3 = document.querySelector('#answer_btn3');
var answerBtn4 = document.querySelector('#answer_btn4');
// Answer, submit, score queries
var checkLine = document.querySelector('#check-line');
var submitPage = document.querySelector('#submit-page');
var inputInitials = document.querySelector('#inital');
var submitBtn = document.querySelector('#submit-btn');
var highScorePage = document.querySelector('#highscore');
var finalScore = document.querySelector('#final_score')
var scoreRecord = document.querySelector('#score-record');
var finish = document.querySelector('#finish');
// Back and clear button queries 
var backBtn = document.querySelector('#back-btn');
var clearBtn = document.querySelector('#clear-btn');

var timeLeft = document.getElementById("#timer");
var secondsLeft = 60;
var questionNumber = 0;
var totalScore = 0;
var questionCount = 1;
var highScore = 0;

var questions = [
    {
        question: "Question 1: How do you create a function in JavaScript?",
        options: ["a. function = myFunction()", "b. myFunction()", "c. function = myFunction()", "d. createMyFunction()"],
        answer: "b. myFunction()"
    },
    {
        question: "Question 2: Arrays use _____ at the start and end ",
        options: ["a. ()", "b. {}", "c. []", "d. <>"],
        answer: "c. []"
    },
    {
        question: "Question 2: What do you use for 'strict' equality? ",
        options: ["a. !=", "b. ==", "c. +=", "d. ==="],
        answer: "d. ===",
    },
    {
        question: "The first index of an array starts at: ",
        options: ["a. 0", "b. 1", "c. 2", "d. 3"],
        answer: "a. 0"
    }
]



// Function to countdown
function countdown() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeLeft.textContent = "Time left: " + secondsLeft + " s";

        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            timeLeft.textContent = "Time's up!";
            finish.textContent = "Game Over"
            gameOver();
        } else if (questionCount >= questions.length +1) {
            clearInterval(timerInterval);
            gameOver();
        }
    }, 1000);
}

// start quiz
function startQuiz() {
    introPage.style.display = "none";
    questionPage.style.display = "block";
    questionNumber = 0
    countdown();
    showQuestion(questionNumber);
}

// present the questions and answers
function showQuestion(n) {
    questionAsk.textContent = questions[n].question
    answerBtn1.textContent = questions[n].answer[0];
    answerBtn2.textContent = questions[n].answer[1];
    answerBtn3.textContent = questions[n].answer[2];
    answerBtn4.textContent = questions[n].answer[3];
    questionNumber = n;
}

// show prompt for correct/incorrect answer
function checkAnswer(event) {
    event.preventDefault();
    checkLine.style.display = "block";
    setTimeout(function () {
        checkLine.style.display = "none";
    }, 1000);
    // checking answers
    if(questions[questionNumber].answer == event.target.value) {
        checkLine.textContent = "Correct";
        totalScore = totalScore + 1;
    } else {
        secondsLeft = secondsLeft - 10;
        checkLine.textContent = "Incorrect. The correct answer is " + questions[questionNumber].answer + " .";
    }
    if(questionNumber < questions.length -1) {
        showQuestion(questionNumber +1);
    } else {
        gameOver();
    }
    questionCount++;
}

function gameOver() {
    questionPage.style.display = "none";
    submitPage.style.display = "block";
    console.log(submitPage);
    // show final score
    finalScore.textContent = "Your final score is :" + totalScore;
    timeLeft.style.display = "none";
};

function getScore() {
    var currentList = localStorage.getItem("ScoreList");
    if(currentList !== null) {
        newList = JSON.parse(currentList);
        return newList;
    } else {
        newList = [];
    }
    return newList;
};

function renderScore () {
    scoreRecord.innerHTML = "";
    scoreRecord.style.display = "block";
    var highScore = sort();
    // slice highscore array to show top results
    var topResults = highScore.slice(0,5);
    for (var i = 0; i < topResults.length; i++) {
        li.textContent = item.user + " - " + item.score;
        li.setAttribute("data-index", i);
        scoreRecord.appendChild(li);
    }
}

// sort highscore
function sort () {
    var unsortedList = getScore();
    if (getScore == null ){
        return;
    } else{
    unsortedList.sort(function(a,b){
        return b.score - a.score;
    })
    return unsortedList;
}};

function addItem(n) {
    var addedList = getScore();
    addedList.push(n);
    localStorage.setItem("ScoreList", JSON.stringify(addedList));
}
function saveScore() {
    var scoreItem = {
        user: userInitial.value,
        score: totalScore
    }
    addItem(scoreItem);
    renderScore();
}

startBtn.addEventListener("click", startQuiz);

reactButtons.forEach(function(click) {
    click.addEventListener("click", checkAnswer);
});

submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    submitPage.style.display = "none";
    introPage.style.display = "none";
    highScorePage.style.display = "block";
    questionPage.style.display = "none";
    saveScore();
})

backBtn.addEventListener("click", function(event) {
    event.preventDefault();
    submitPage.style.display = "none";
    introPage.style.display = "none";
    highScorePage.style.display = "block";
    questionPage.style.display = "none";
    location.reload();
})

clearBtn.addEventListener("click", function(event) {
    event.preventDefault();
    localStorage.clear();
    renderScore();
})



// push score to local storage
// submitBtn.addEventListener('click', function(event){
//     event.preventDefault()
//     var initials = inputInitials.value
//     var highScoreStorage = window.localStorage.getItem("highscores") ? JSON.parse(window.localStorage.getItem("highscores")) : []
//     highScoreStorage.push({initials,highScore})
//     window.localStorage.setItem("highscores", JSON.stringify(highScoreStorage))
// })