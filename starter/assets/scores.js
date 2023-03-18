// Assigning highscores element to variable
const highscoresEl = $('#highscores');
const clearButtonEl = $('#clear');

// Function to get scores array from local storage then iterate through this and create a new list element for each object. This list item then shows the details we want from each object.
function displayScores() {
    scores = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    scores.forEach(element => {
        var userScoreEl = $('<li>');
        userScoreEl.text("Initials: " + element.initials + " Final Score: " + element.finalScore + " Time Remaining: " + element.finalTime);
        highscoresEl.append(userScoreEl);
    });
}

displayScores();

// Function to clear screen of scores and delete scores array from local storage

function clearScores() {
    highscoresEl.empty();
    localStorage.clear();
}

// Add event listener to clear button that links to function
clearButtonEl.on('click', clearScores);
