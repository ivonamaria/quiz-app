const highscoresList = document.getElementById('highscores');


let highscores = JSON.parse(localStorage.getItem('highscores')) || [];

highscores.sort(function (a, b) {
  return b.score - a.score;
});

function clearHighscores() {
  highscores = [];
  localStorage.setItem('highscores', JSON.stringify(highscores));
  highscoresList.innerHTML = '';
}

let highscoresHTML = '';
highscores.forEach(function (score) {
  highscoresHTML += '<li>' + score.initials + ' - ' + score.score + '</li>';
});
highscoresList.innerHTML = highscoresHTML;

// Clear Highscores button
const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', clearHighscores);