//html elements that frequently get grabbed
var timerTag = document.querySelector(`#timerTag`); //span containing timer
var timerPTag  = document.querySelector(`header`).children[1]; //time display tag
var submitHighscoreBtn = document.querySelector(`#submitHighscoreBtn`); //submit btn at end
var viewHighscoresBtn = document.querySelector(`#viewHighscoresBtn`); //view highscore 
var clearHighscoreBtn = document.querySelector(`#clearHighscoreBtn`); //btn that clears localstorge in highscore view section
var answerButtonLst = document.body.querySelector(`ul`); //list that holds answer list items
var goBackHighscoreBtn = document.querySelector(`#goBackBtn`); //back btn in highscore section
var startBtn = document.querySelector(`#startBtn`); //button that loads quiz
var titleTag = document.querySelector(`#title`) //h1 tag 

//questions & answers section
var questionObj = { 
    questions: [ 
        `How do you create a function in JavaScript?`,
        `What is the correct JavaScript syntax to change the content of the HTML element below? <p id="demo">This is a demonstration.</p>`,
        `What do you use for 'strict' equality?`,
        `The first index of an array starts at:`,
        `How do you write "Hello World" in an alert box?`,
    ],
    answers: [ 
        [`function = myFunction()`, `myFunction()`, `var = myFunction()`, `correct:function myFunction()`],
        [`document.getElement("p").innerHTML = "Hello World!";`, `#demo.innerHTML = "Hello World!";`, `correct:document.getElementById("demo").innerHTML = "Hello World!";`, `document.getElementByName("p").innerHTML = "Hello World!";`],
        [`!=`, `==`, `+=`, `correct:===`], //uses `correct:` so that even if answer has the word `correct` its not flagged as correct answer
        [`correct:<script src="xxx.js">`, `<script name="xxx.js">`, `<script href="xxx.js">`, `<script link="xxx.js">`],
        [`msgBox("Hello World");`, `alertBox("Hello World");`, `correct:alert("Hello World");`, `msg("Hello World");`] 
    ] 
}

var globalTimerPreset = 75; // game presets to be easily accessed for balancing

//global quiz/game variables
var questionIndexNumber = 0; //keeps track of the current question number for question object
var timeLeft = globalTimerPreset; //time left variable
var score = 0; //score that gets calculated at end of the game
var gameEnded = true; //boolean helps some functions know if game has already ended as well as timer.

//intial setup for the game 
function setUpGame() {
    timeLeft = globalTimerPreset; //reset the time back to 99 seconds
    timerTag.textContent = globalTimerPreset; //sets the default number of the timer to start number on pageload

    //hide elements that may be visible after a previous round
    document.querySelector(`#display-highscore-div`).style.display = `none`; //this would be the last visible item after viewing highscore of a previous game

    //fills back content that gets reused for quiz questions
    titleTag.textContent = `Coding Quiz Challenge`; //reused h1 tag for questions

    //display items that are needed for the "main menu"
    titleTag.style.display = `block`; 
    document.querySelector(`#instructions`).style.display = `block`; 
    viewHighscoresBtn.style.display = `block`; 
    startBtn.style.display = `block`; //show the start button

    return;
}

//gets triggered if the start button at "main menu" gets clicked
function startGame() {
    gameEnded = false; //when game starts set gameEnded back to false
    questionIndexNumber = 0; //keeps track of the current question number for question object

    //when game starts clean up the main div
    viewHighscoresBtn.style.display = `none` //if game is in progress because being timed no stopping to view highscores sorry focus up!
    startBtn.style.display = `none`; //hide start button when game starts
    document.querySelector(`#instructions`).style.display = `none`; //hide instructions beneath h1 tag (not used in questions)
    timerPTag.style.display = `block`; //display timer at the top now that game started

    //functions that create the user experience
    showQuestions(questionIndexNumber); //start generating the questions
    startTimer(); //make sure all formatting gets sorted out before timing the user

    return;
}

//timer interval that runs while user takes quiz
function startTimer() {
    var timerInterval = setInterval(function() {
        if(gameEnded === true) { //test if game ended before anything incase needs to be stopped
            clearInterval(timerInterval); //stop
            return;
        }
        if(timeLeft < 1) { //if timer is out under 1 cause wrong answers subtract 10 seconds game ends and timer stops
            clearInterval(timerInterval); //stop
            endGame(); //end game out of time scenario
        }

        timerTag.textContent = timeLeft; //update timer tag to latest time
        timeLeft--; //decrement timer after all code runs
    }, 1000); //1 second intervals

    return;
}

//uses the questionIndexNumber to show the question of the current index and its answers
function showQuestions(currentQuestionIndex) {
    titleTag.textContent = questionObj.questions[currentQuestionIndex]; //select h1 tag and set it as the question
    createAnswerElements(currentQuestionIndex); //create answers for current question

    return;
}

//function to create new answer elements
function createAnswerElements(currentQuestionIndex) {
    answerButtonLst.innerHTML = ''; // clears current answers on current round

    for (let answerIndex = 0; answerIndex < questionObj.answers[currentQuestionIndex].length; answerIndex++) { // here we loop over every answer and (for current question) creates a li 
        var currentAnswerListItem = document.createElement(`li`); //new list item
        var tempStr = questionObj.answers[currentQuestionIndex][answerIndex]; 

     
        if (questionObj.answers[currentQuestionIndex][answerIndex].includes(`correct:`)){
            tempStr = questionObj.answers[currentQuestionIndex][answerIndex].substring(8, questionObj.answers[currentQuestionIndex][answerIndex].length); 
            currentAnswerListItem.id = `correct`; 
        }

        currentAnswerListItem.textContent = tempStr;  
        answerButtonLst.appendChild(currentAnswerListItem); 
    }

    return;
}

//function to be called it will iterate to the next question 

function nextQuestion() {
    questionIndexNumber++; //increments index by 1 so we can keep track of what question we are on
    if (questionIndexNumber >= questionObj.questions.length){ //if we run out of questions end the game
        endGame(); //ends the game
    } else { 
        showQuestions(questionIndexNumber); //showQuestion handles showing textContent of current Index
    } 

    return;
}

//function to end the game
function endGame() { 
    gameEnded = true; 
    score = timeLeft; 

    //hide necessary elements
    timerPTag.style.display = `none`; 
    titleTag.style.display = `none`; 
    answerButtonLst.innerHTML = ''; 

    //show endscreen score and form to enter name for highscore storage

    document.querySelector(`#scoreSpan`).textContent = score; 
    document.querySelector(`#submit-highscore-div`).style.display = `block`; 

    return;
}

// Event Section

//function to be run when the answer btn is clicked
function checkAnswer(event) {
    if (event.target != answerButtonLst){ 

        if (!(event.target.id.includes('correct'))){ 
            timeLeft -= 10; 
        }

        nextQuestion(); // method to run next question
    }

    return;
}

// Function is triggered when highscore btn is clicked 

function storeScoreAndName() {
    var highscoreTextbox = document.querySelector(`input`); 
    var tempArrayOfObjects = []; 

    if (highscoreTextbox.value != `` || highscoreTextbox.value != null) { 
        var tempObject = { 
            names: highscoreTextbox.value, 
            scores: score, 
        }

        if(window.localStorage.getItem(`highscores`) == null) { //if no data exsists create a new array of objects
            tempArrayOfObjects.push(tempObject); //push current user score and name into our empty array
            window.localStorage.setItem(`highscores`, JSON.stringify(tempArrayOfObjects)); //send our new array into local storage

        } else { //if some data previously was stored and exsist lets add onto it and put the score in the right spot of the leaderboard
            tempArrayOfObjects = JSON.parse(window.localStorage.getItem(`highscores`)); //get and parse our array into a usable variable

            //loop over array looking for right spot to put our new submitted score (starts from high to low)

            for (let index = 0; index <= tempArrayOfObjects.length; index++) { 
                if (index == tempArrayOfObjects.length) { 
                    tempArrayOfObjects.push(tempObject) //add our new score to the end of highscores
                    break; // prevents a forever loop
                } else if (tempArrayOfObjects[index].scores < score) { 
                    tempArrayOfObjects.splice(index, 0, tempObject); 
                    break; 
                }
            }
            window.localStorage.setItem(`highscores`, JSON.stringify(tempArrayOfObjects)) // here we turn our array of objects into a string and store it in local storage
        }
        document.querySelector(`input`).value = ``; //clear out the input so its not prefilled for another round of the quiz
        score = 0; //set score back to 0 because we have already stored it and the game is over

        showHighscores(); //if user is able to submit that means they are at end of game and go show how they stack up on the highscores
    }

    return;
}

// function that triggers when viewHighscores btn is clicked hides all elements and displays the highscore board filled with localstorage values

function showHighscores() {
    // hiding elements
    titleTag.style.display = `none`; 
    startBtn.style.display = `none`; 
    document.querySelector(`header`).children[0].style.display = `none`; 
    document.querySelector(`#instructions`).style.display = `none`; 
    document.querySelector(`#submit-highscore-div`).style.display = `none`; 


    document.querySelector(`#display-highscore-div`).style.display = `block`; 

    tempOrderedList = document.querySelector(`ol`); 
    tempOrderedList.innerHTML = `` 

    tempArrayOfObjects = JSON.parse(window.localStorage.getItem(`highscores`)); //parse all local storage highscores
    if (tempArrayOfObjects != null) { 
        for (let index = 0; index < tempArrayOfObjects.length; index++) { 
            var newLi = document.createElement(`li`) 
            newLi.textContent = tempArrayOfObjects[index].names + ` - ` + tempArrayOfObjects[index].scores; 
            tempOrderedList.appendChild(newLi); 
        }

    } else { 
        var newLi = document.createElement(`p`) 
        newLi.textContent = `No Highscores` 
        tempOrderedList.appendChild(newLi); 
    }

    return;
}

// Function triggers when clearHighscore btn is clicked; clears the local storage
function clearHighscores() {
    document.querySelector(`ol`).innerHTML = ``; //empties out the highscore list
    window.localStorage.clear(); //clear local storage

    // setUpGame(); method to go back to main menu

    return;
}

function init() {
    //elements on DOM 
    startBtn.addEventListener(`click`, startGame); //button that starts the game
    answerButtonLst.addEventListener(`click`, checkAnswer); //list that contains the answer <li> tags which are used as buttons
    viewHighscoresBtn.addEventListener(`click`, showHighscores); //shows the highscores
    submitHighscoreBtn.addEventListener(`click`, storeScoreAndName); //submits highscores
    clearHighscoreBtn.addEventListener(`click`, clearHighscores); //clears localstorage
    goBackHighscoreBtn.addEventListener(`click`, setUpGame); //returns back to main screen to show start and instructions

    setUpGame(); //prepare the screen for and display the appropriate items to get ready for quiz

    return;
}

init(); 