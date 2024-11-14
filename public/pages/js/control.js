// public/js/control.js

const socket = io();
const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('gameId');
const overlayUrl = `${window.location.origin}/pages/html/overlay.html?gameId=${gameId}`;

document.getElementById('overlayUrl').value = overlayUrl;

// Fetch team names from the server using the gameId
fetch(`/api/games/${gameId}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('team1-name').textContent = data.teamA || "Team 1";
        document.getElementById('team2-name').textContent = data.teamB || "Team 2";
    })
    .catch(error => console.error('Error fetching team names:', error));

function incrementScore(scoreId) {
    const scoreInput = document.getElementById(scoreId);
    scoreInput.value = parseInt(scoreInput.value) + 1;
    updateScore();
}

function decrementScore(scoreId) {
    const scoreInput = document.getElementById(scoreId);
    if (parseInt(scoreInput.value) > 0) {
        scoreInput.value = parseInt(scoreInput.value) - 1;
    }
    updateScore();
}

function nextPeriod() {
    const periodInput = document.getElementById('gamePeriod');
    if (periodInput.value === "1st Quarter") {
        periodInput.value = "2nd Quarter";
    } else if (periodInput.value === "2nd Quarter") {
        periodInput.value = "3rd Quarter";
    } else if (periodInput.value === "3rd Quarter") {
        periodInput.value = "4th Quarter";
    } else if (periodInput.value === "4th Quarter") {
        periodInput.value = "Overtime";
    } else {
        periodInput.value = "1st Quarter";
    }
    updateScore();
}

function updateScore() {
    const scoreA = document.getElementById('scoreA').value;
    const scoreB = document.getElementById('scoreB').value;
    const time = document.getElementById('gameTime').value;
    const period = document.getElementById('gamePeriod').value;
    socket.emit('updateScore', { gameId, scoreA, scoreB, time, period });
}

let timer;
let timeInSeconds = 0;

function startTimer() {
    if (timer) return; // Prevent multiple intervals

    timer = setInterval(() => {
        timeInSeconds++;
        const minutes = String(Math.floor(timeInSeconds / 60)).padStart(2, '0');
        const seconds = String(timeInSeconds % 60).padStart(2, '0');
        document.getElementById('gameTime').value = `${minutes}:${seconds}`;
        updateScore();
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    timer = null;
    updateScore();
}

function resetTimer() {
    stopTimer();
    timeInSeconds = 0;
    document.getElementById('gameTime').value = "00:00";
    updateScore();
}

function goToLandingPage() {
    window.location.href = '/pages/html/landing.html';
}

function copyOverlayUrl() {
    const overlayUrlInput = document.getElementById('overlayUrl');
    overlayUrlInput.select();
    overlayUrlInput.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand('copy');
    alert('Overlay URL copied to clipboard');
}
