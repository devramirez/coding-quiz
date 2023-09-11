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
        answer: "myFunction()"
    },
    {
        question: "Question 2: Arrays use _____ at the start and end ",
        options: ["a. ()", "b. {}", "c. []", "d. <>"],
        answer: "[]"
    },
    {
        question: "Question 2: What do you use for 'strict' equality? ",
        options: ["a. !=", "b. ==", "c. +=", "d. ==="],
        answer: "===",
    },
    {
        question: "The first index of an array starts at: ",
        options: ["a. 0", "b. 1", "c. 2", "d. 3"],
        answer: "0"
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


// GAME DISPLAY

//questions array, correct when choices index = answer
// const questions = [
//     {
//         question: "Which of the following is NOT a primitive data type?",
//         choices: ["Number", "Boolean", "Letter", "String"],
//         answer: "Letter",
//     },
//     {
//         question: "Which method adds items to an array one at a time?",
//         choices: ["add()", "push()", "sort()", "Cannot be done"],
//         answer: "push()",
//     },
//     {
//         question: "What kind of loop will repeat a block of code until a condition returns 'false'?",
//         choices: ["For Loop", "For In Loop", "Fruit Loop", "While Loop"],
//         answer: "While Loop",
//     },
//     {
//         question: "What does the acronym DOM represent?",
//         choices: ["Dinner On Me", "Document Object Model", "Document Only Model", "Done On Microsoft"],
//         answer: "Document Object Model",
//     },
//     {
//         question: "Which term describes a reusable block of code that performs a certain task?",
//         choices: ["Function", "Class", "ID", "Boolean"],
//         answer: "Function",
//     },
// ]

// // countdown game timer
// var secondsLeft = 60 
// function countdown() {
//     var timeText = document.getElementById("timeLeft");
//     var timeLeft = setInterval(function () {
//         secondsLeft--;
//         timeText.textContent = secondsLeft;
//         if (secondsLeft <= 0) {
//             clearInterval(timeLeft);
//             gameOver();
//         } 
//     }, 1000);
// }

// //question variables
// var questionText = document.getElementById("questionText");
// var questionsIndex = 0;

// //choice variables
// var btnA = document.getElementById("btnA");
// var btnB = document.getElementById("btnB");
// var btnC = document.getElementById("btnC");
// var btnD = document.getElementById("btnD");

// // score variables
// var scoreText = document.getElementById("score");
// var correctAnswers = 0;

// //page container/game over variables
// var scoreDisplay = document.getElementById("score-display");
// var choiceContainer = document.getElementById("choice-container");

// function askQuestion() {
//     questionText.textContent = questions[questionsIndex].question;
//     btnA.textContent = questions[questionsIndex].choices[0];
//     btnB.textContent = questions[questionsIndex].choices[1];
//     btnC.textContent = questions[questionsIndex].choices[2];
//     btnD.textContent = questions[questionsIndex].choices[3];
// }

// // event listeners/functions for user choices
// btnA.addEventListener("click", checkA);
// btnB.addEventListener("click", checkB);
// btnC.addEventListener("click", checkC);
// btnD.addEventListener("click", checkD);

// function checkA() {checkAnswer(0);}
// function checkB() {checkAnswer(1);}
// function checkC() {checkAnswer(2);}
// function checkD() {checkAnswer(3);}

// // check answers and go to next question
// function checkAnswer(answer) {
//     if (questions[questionsIndex].answer === questions[questionsIndex].choices[answer]) {
//         correctAnswers++;
//         scoreText.textContent = correctAnswers; 
//     } else {
//         secondsLeft = secondsLeft - 5;
//     }
//     nextQuestion();
// }

// function nextQuestion() {
//     if (questionsIndex < 4) {
//     questionsIndex++; 
//     askQuestion();
//     } else {
//     secondsLeft = 0;
//     showInitials();
//     }
// }

// // GAME OVER 

// var gameOverDisplay = document.getElementById("game-over")
// var userScoreContainer = document.getElementById("user-score-container");
// var highScoreInput = document.getElementById("high-score-input");
// var highScoreList = document.getElementById("high-score-list");
// var endScore = document.getElementById("end-score");
// var finalPage = document.getElementById("high-scores")

// function showInitials() {
//    gameOverDisplay.style.display = "block";
//    scoreDisplay.style.display = "none";
//    questionText.style.display = "none";
//    choiceContainer.style.display = "none";

//    endScore.textContent = correctAnswers;
// }

// function gameOver() {
//    scoreDisplay.style.display = "none";
//    questionText.style.display = "none";
//    choiceContainer.style.display = "none";

//     showInitials()
// }

// // submit button
// var nameInput = document.getElementById("name-input");
// function enterName(event) {
//     if (nameInput.value === "") {
//         alert("Enter your initials!");
//         event.preventDefault();
//         return;
//     }
// }

// var submitBtn = document.getElementById("submit-button");
// submitBtn.addEventListener("click", function(event) {
//     event.preventDefault();
//     enterName();
//     saveLastScore();
//     showHighScores();
// });

// // HIGH SCORES

// // push to local storage
// function saveLastScore() {   
//     let localStorageData = JSON.parse(localStorage.getItem('userScore'))
//     var userScore = {
//     name: nameInput.value,
//     score: endScore.textContent
//     }; 
//     if (localStorageData === null){
//         localStorageData = [];
//         localStorageData.push(userScore)
//     } else (
//         localStorageData.push(userScore)
//     )
//     localStorage.setItem("userScore", JSON.stringify(localStorageData));
//     console.log(localStorageData)
// }

// // show high score list
// var highScoresDisplay = document.getElementById("high-scores");

// function showHighScores() {
//     gameOverDisplay.style.display = "none";
//     highScoresDisplay.style.display = "block";

//     // create recent score table
//     let localStorageData = JSON.parse(localStorage.getItem('userScore')).reverse()
//     let table = document.createElement('table')
//     let thead = document.createElement('thead')

//     let th1 = document.createElement('th')
//     th1.innerHTML = 'Initials';

//     let th2 = document.createElement('th')
//     th2.innerHTML = 'Score';

//     thead.append(th1, th2)
//     table.append(thead)

//     // limit recent score table to 5 rows
//     let rowCount;
//     if (localStorageData.length > 5) {
//         rowCount = 5
//     } else {
//         rowCount = localStorageData.length
//     }

//     for (i = 0; i < rowCount; i++) {
//         let tr = document.createElement('tr')
//         let td1 = document.createElement('td')
//         td1.innerHTML = localStorageData[i].name;
//         let td2 = document.createElement('td')
//         td2.innerHTML = localStorageData[i].score;
//         tr.append(td1, td2)
//         table.append(tr)
//     }

//     document.getElementById('high-score-list').append(table);
// }

// // ON LOAD START GAME

// window.onload = function() {
//     gameOverDisplay.style.display = "none";
//     highScoresDisplay.style.display = "none";
//     countdown();
//     askQuestion();
// }