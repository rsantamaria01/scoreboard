// public/js/control.js

const socket = io();
const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('gameId');
const overlayUrl = `${window.location.origin}/pages/html/overlay.html?gameId=${gameId}`;

document.getElementById('overlayUrl').value = overlayUrl;

// Fetch team names and sport from the server using the gameId
fetch(`/api/games/${gameId}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('team1-name').textContent = data.teamA || "Team 1";
        document.getElementById('team2-name').textContent = data.teamB || "Team 2";
        const sport = data.sport;
        setupPeriods(sport);
    })
    .catch(error => console.error('Error fetching game information:', error));

function setupPeriods(sport) {
    const periods = {
        Soccer: ["1st Half", "2nd Half", "Extra Time 1st Half", "Extra Time 2nd Half", "Penalty Shootout"],
        Basketball: ["1st Quarter", "2nd Quarter", "3rd Quarter", "4th Quarter", "Overtime"],
        AmericanFootball: ["1st Quarter", "2nd Quarter", "3rd Quarter", "4th Quarter", "Overtime"],
        IceHockey: ["1st Period", "2nd Period", "3rd Period", "Overtime", "Shootout"],
        Baseball: ["1st Inning", "2nd Inning", "3rd Inning", "4th Inning", "5th Inning", "6th Inning", "7th Inning", "8th Inning", "9th Inning", "Extra Innings"],
        Tennis: ["1st Set", "2nd Set", "3rd Set", "4th Set", "5th Set", "Tie-Break"],
        RugbyUnion: ["1st Half", "2nd Half", "Extra Time 1st Half", "Extra Time 2nd Half"],
        CricketODI: ["1st Inning", "2nd Inning"],
        CricketT20: ["1st Inning", "2nd Inning"],
        Handball: ["1st Half", "2nd Half", "Overtime 1st Half", "Overtime 2nd Half"],
        RugbyLeague: ["1st Half", "2nd Half", "Golden Point Overtime"]
    };

    window.periods = periods[sport] || [];
}

function nextPeriod() {
    const periodInput = document.getElementById('gamePeriod');
    const currentPeriod = periodInput.value;
    const currentIndex = window.periods.indexOf(currentPeriod);
    const nextIndex = (currentIndex + 1) % window.periods.length;
    periodInput.value = window.periods[nextIndex];
    updateScore();
}

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
