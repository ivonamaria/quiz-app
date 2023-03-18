const startSection = document.getElementById('start-screen');
const startBtnEl = document.getElementById('start-button');
const questionsEl = document.getElementById('questions');
const questionnumberEl = document.getElementById('question-number');
const questionTitleEl = document.getElementById('question-title');
const choicesEl = document.getElementById('choices');
const finalScoreEl = document.getElementById('final-score');
const finaltimeEl = document.getElementById('final-time');
const feedbackEl = document.getElementById('feedback');
const endSection = document.gex3sh3tElementById('end-screen');
const timerEl = document.getElementById('time');
const timeoutEl = document.getElementById('timeout-screen');
const submitEl = document.getElementById('submit');

// ID selectors for audio elements
const correctSoundEl = document.getElementById('correctSound');
const incorrectSoundEl = document.getElementById('incorrectSound');
const initialsEl = document.getElementById('initials');

// Creating variables that need to be accessed by different functions and should have default values at start of quiz
let questionNumber = 0;
let time = 100;
let userScore = 0;
const userObject = {};

// Function to select 10 questions at random and populate the quiz accordingly
function loadQuestion() {

    if (questionNumber < 10) {
        questionsEl.style.display = 'block';
        startSection.style.display = 'none';

        // Get a random question from the array of questions
        const questionIndex = Math.floor(Math.random() * questionArray.length);
        const randomQuestionArray = questionArray[questionIndex];
        questionNumber++;
        questionnumberEl.textContent = 'Question No. ' + questionNumber + ": ";
        // Take the title from the first item in the question array
        questionTitleEl.textContent = randomQuestionArray[0];
        // Iterate through the rest of the question array from index two onwards where the possible answers are stored. Dynamically generate a button for each possible answer so that you can easily create new questions with as many possible answers as you like.
        for (let i = 2; i < randomQuestionArray.length; i++) {
            const answerBtnEl = document.createElement('button');
            // Give each button an id value that can be checked against the correct answer index that is stored in index 1 of the question array. I wanted to avoid using the id attribute but ran into issues using a custom attribute 'dataindex'.
            answerBtnEl.setAttribute('id', i);
            answerBtnEl.textContent = randomQuestionArray[i];
            answerBtnEl.classList.add('answer-button');
            answerBtnEl.addEventListener('click', function () {
                // Get the previously created id value and store to a variable buttonValue
                const buttonValue = this.id;
                // Check buttonValue against correct answer index to see if correct
                if (buttonValue == randomQuestionArray[1]) {
                    console.log("Correct");
                    userScore++;
                    correctSoundEl.play();
                } else {
                    console.log("Incorrect");
                    incorrectSoundEl.play();
                    time -= 10;
                }
                // After button is clicked run below function to reset answer buttons
                clearAnswers();
            });
            choicesEl.appendChild(answerBtnEl);
        }
        // After a question has been used remove this from the array of questions so that it is not repeated
        questionArray.splice(questionIndex, 1);
    } else {
        // After 10 questions have been answered run the following to end the quiz. This quiz is designed so that you can easily expand to have as many questions as you like, 10 will then be selected at random.
        questionsEl.style.display = 'none';
        endSection.style.display = 'block';
        // Save results to userObject and display results
        userObject.finalScore = userScore;
        userObject.finalTime = time;
        finalScoreEl.text(userScore);
        finaltimeEl.text(time);
    }
}

startBtnEl.on('click', startQuiz);

submitEl.on('click', function () {
    // Store initials to userObject
    userObject.initials = initialsEl.value;
    // Get scores from local Storage, if none then return an empty array to populate with our UserObjects. Then finally save the new array back into local storage.
    scores = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    scores.push(userObject);
    localStorage.setItem("leaderboard", JSON.stringify(scores));
});

// Function for starting quiz
function startQuiz() {
    startTimer();
    loadQuestion();
}

// Function for clearing answer buttons and loading next question
function clearAnswers() {
    choicesEl.empty();
    loadQuestion();
}

// Function for displaying reducing timer, when it reaches zero a timeout message is displayed
function startTimer() {

    setInterval(function () {
        time--;
        timerEl.text(time);

        if (time < 0) {
            questionsEl.css('display', 'none');
            timeoutEl.css('display', 'block');
            time = 0;
        }
    }, 1000);
}
