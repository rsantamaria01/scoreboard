// public/pages/js/control.js

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
    fetch('/api/sports')
        .then(response => response.json())
        .then(data => {
            const sportInfo = data.find(s => s.SportName === sport);
            if (sportInfo) {
                window.periods = generatePeriods(sportInfo);
                window.breakName = sportInfo.BreakName;
                document.getElementById('gamePeriod').value = window.periods[0]; // Set initial period
            } else {
                window.periods = [];
                window.breakName = "Break";
            }
        })
        .catch(error => console.error('Error fetching sports information:', error));
}

function generatePeriods(sportInfo) {
    const periods = [];
    for (let i = 1; i <= sportInfo.RegPeriod; i++) {
        periods.push(`${i} ${sportInfo.RegPeriodName}`);
    }
    for (let i = 1; i <= sportInfo.ExPeriod; i++) {
        periods.push(`${i} ${sportInfo.ExPeriodName}`);
    }
    if (sportInfo.Penalty) {
        periods.push(sportInfo.PenaltyName);
    }
    return periods;
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
let periodLengthInSeconds = 0;

function startTimer() {
    if (timer) return; // Prevent multiple intervals

    const periodLength = parseInt(document.getElementById('periodLength').value, 10);
    periodLengthInSeconds = periodLength * 60;

    timer = setInterval(() => {
        timeInSeconds++;
        const minutes = String(Math.floor(timeInSeconds / 60)).padStart(2, '0');
        const seconds = String(timeInSeconds % 60).padStart(2, '0');
        let displayTime = `${minutes}:${seconds}`;

        if (timeInSeconds > periodLengthInSeconds) {
            const overtimeSeconds = timeInSeconds - periodLengthInSeconds;
            const overtimeMinutes = String(Math.floor(overtimeSeconds / 60)).padStart(2, '0');
            const overtimeDisplaySeconds = String(overtimeSeconds % 60).padStart(2, '0');
            displayTime = `${minutes}:${seconds} + ${overtimeMinutes}:${overtimeDisplaySeconds}`;
        }

        document.getElementById('gameTime').value = displayTime;
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

function goToGameSetupPage() {
    window.location.href = '/pages/html/game-setup.html';
}

function copyOverlayUrl() {
    const overlayUrlInput = document.getElementById('overlayUrl');
    overlayUrlInput.select();
    overlayUrlInput.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand('copy');
    showToast('Overlay URL copied to clipboard');
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show';
    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
    }, 3000);
}
