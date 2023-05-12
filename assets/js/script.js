// Intro Section
var welcome = document.querySelector('#introduction');
var introPage = document.querySelector('#intro-page');
var startBtn = document.querySelector('#start-button');
// Question Section
var questionPage = document.querySelector('#question-page');
var questionAsk = document.querySelector('#question-ask');
var answersContainer = document.querySelector("#answersContainer");
// Answer Buttons
var reactButtons = document.querySelector('.answer');
var answerBtn1 = document.querySelector('#answer_btn1');
var answerBtn2 = document.querySelector('#answer_btn2');
var answerBtn3 = document.querySelector('#answer_btn3');
var answerBtn4 = document.querySelector('#answer_btn4');
// Answer, submit, score queries
var answerCheck = document.querySelector('#answer-check');
var submitPage = document.querySelector('#submit-page');
var inputInitials = document.querySelector('#inital');
var submitBtn = document.querySelector('#submit-btn');
var highScorePage = document.querySelector('#highscore');
var highScore = 0;
var scoreRecord = document.querySelector('#score-record');
var finish = document.querySelector('#finish');
// Back and clear button queries 
var backBtn = document.querySelector('#back-btn');
var clearBtn = document.querySelector('#clear-btn');
var rightAnswer = ""
var userAnswer = ""
var questionIndex = 0
var timer = 60;
var interval 
var questions = [
    {
        question: "Question 1: We will enter questions here",
        answers: ["a. oneAnswer", "b. twoAnswer", "c. thirdAns", "d. fourthAns"],
        rightAnswer: "a. oneAnswer"
    },
    {
        question: "Question 2: We will enter questions here",
        answers: ["e. oneAnswer", "f. twoAnswer", "g. thirdAns", "h. fourthAns"],
        rightAnswer: "a. oneAnswer"
    }
]

function displayQuestions(array) {
    if (questionIndex < array.length) {
        answersContainer.innerHTML = ""
        rightAnswer = array[questionIndex].rightAnswer
        questionAsk.textContent = array[questionIndex].question
        const choices = array[questionIndex].answers
        for (let index = 0; index < choices.length; index++) {
            const element = choices[index];
            const answerBtn = document.createElement("button")
            answerBtn.setAttribute("class", "answers")
            answerBtn.textContent = element
            answersContainer.append(answerBtn)

            
        }
    } else {
        highScore = timer
        alert("Game Over!")
        questionPage.style.display = "none"
        submitPage.style.display = "block"
    }

}



// Function to countdown
function countDown() {
interval = setInterval(() => {
  document.getElementById("timer").textContent = timer;
  if (timer > 0) {
    timer--;
    console.log(timer)
  } else {
    highScore = timer
    clearInterval(interval)
    alert("Game over!")
  }
}, 1000);
}
// countDown()

startBtn.addEventListener('click', function(event){
    event.preventDefault()
    introPage.style.display = "none"
    questionPage.style.display = "block"
    countDown()
    displayQuestions(questions)
})
document.addEventListener('click', function(event) {
    if (event.target && event.target.matches(".answers")){
        userAnswer = event.target.textContent
        if (userAnswer === rightAnswer) {
            alert("Correct Answer!")
        } else {
            timer-=10
            alert("Wrong Answer")
            
        }
        questionIndex++
        displayQuestions(questions)
    } 
})

// push score to local storage
submitBtn.addEventListener('click', function(event){
    event.preventDefault()
    var initials = inputInitials.value
    var highScoreStorage = window.localStorage.getItem("highscores") ? JSON.parse(window.localStorage.getItem("highscores")) : []
    highScoreStorage.push({initials,highScore})
    window.localStorage.setItem("highscores", JSON.stringify(highScoreStorage))
})