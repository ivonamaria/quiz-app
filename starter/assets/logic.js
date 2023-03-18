const timeDisplay = document.getElementById('time');
const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start');
const questionsBox = document.getElementById('questions');
const questionTitle = document.getElementById('question-title');
const choices = document.getElementById('choices');
const endScreen = document.getElementById('end-screen');
const finalScore = document.getElementById('final-score');
const initialsInput = document.getElementById('initials');
const submit = document.getElementById('submit');
const feedback = document.getElementById('feedback');

// Adding event listener to innitialize the start function when the button in clicked
startButton.addEventListener('click', start);

let currentQuestionIndex = 0;


function start() {
    startScreen.classList.add('hide');
    questionsBox.classList.remove('hide');
  
    // Display the first question and options
    questionTitle.innerText = quizQuestions[0].question;
    let answers = quizQuestions[0].options;
    for (let i = 0; i < answers.length; i++) {
      let answerButton = document.createElement('button');
      choices.appendChild(answerButton);
      answerButton.setAttribute('value', answers[i]);
      answerButton.innerText = answers[i];
      answerButton.addEventListener('click', checkAnswer);
    }
  
    timeInterval();
  }
  
  function checkAnswer(event) {
    let selectedAnswer = event.target.value;
  
    if (selectedAnswer === quizQuestions[currentQuestionIndex].answer) {
      feedback.innerText = 'Correct!';
      score += 1;
    } else {
      feedback.innerText =
        'Wrong. The correct answer is: ' + quizQuestions[currentQuestionIndex].answer;
    }
  
    feedback.classList.remove('hide');
  
    // Display the next question and options
    currentQuestionIndex++;
    if (currentQuestionIndex >= quizQuestions.length) {
      end();
    } else {
      questionTitle.innerText = quizQuestions[currentQuestionIndex].question;
      choices.innerHTML = '';
      let answers = quizQuestions[currentQuestionIndex].options;
      for (let i = 0; i < answers.length; i++) {
        let answerButton = document.createElement('button');
        choices.appendChild(answerButton);
        answerButton.setAttribute('value', answers[i]);
        answerButton.innerText = answers[i];
        answerButton.addEventListener('click', checkAnswer);
      }
    }
  }  

function end() {
  questionsBox.classList.add('hide');
  endScreen.classList.remove('hide');
  clearInterval(timerInterval);
  feedback.classList.add('hide');
  finalScore.innerText = score;
  submit.addEventListener('click', function (event) {
    event.preventDefault();

    let highscores = JSON.parse(localStorage.getItem('highscores')) || [];

    // save to local Storage
    let initials = initialsInput.value.trim();

    let newScore = {
      score: score,
      initials: initials,
    };

    // local storage
    highscores.push(newScore);
    localStorage.setItem('highscores', JSON.stringify(highscores));
    location.href = 'highscores.html';
  });
}