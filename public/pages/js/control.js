// public/pages/js/control.js

document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('gameId');
    const overlayUrl = `${window.location.origin}/pages/html/overlay.html?gameId=${gameId}`;

    document.getElementById('overlayUrl').value = overlayUrl;

    let currentPeriodIndex = 0;
    let isBreak = false;

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

    window.nextPeriod = function nextPeriod() {
        isBreak = false;
        document.getElementById('gameTimer').style.display = 'block';
        currentPeriodIndex = (currentPeriodIndex + 1) % window.periods.length;
        document.getElementById('gamePeriod').value = window.periods[currentPeriodIndex];
        resetTimer();
        updateScore();
    }

    window.previousPeriod = function previousPeriod() {
        isBreak = false;
        document.getElementById('gameTimer').style.display = 'block';
        currentPeriodIndex = (currentPeriodIndex - 1 + window.periods.length) % window.periods.length;
        document.getElementById('gamePeriod').value = window.periods[currentPeriodIndex];
        resetTimer();
        updateScore();
    }

    window.showBreak = function showBreak() {
        isBreak = true;
        document.getElementById('gamePeriod').value = window.breakName;
        document.getElementById('gameTimer').style.display = 'none';
        updateScore();
    }

    window.incrementScore = function incrementScore(scoreId) {
        const scoreInput = document.getElementById(scoreId);
        scoreInput.value = parseInt(scoreInput.value) + 1;
        updateScore();
    }

    window.decrementScore = function decrementScore(scoreId) {
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
        socket.emit('updateScore', { gameId, scoreA, scoreB, time, period, isBreak });
    }

    let timer;
    let timeInSeconds = 0;
    let periodLengthInSeconds = 0;

    window.startTimer = function startTimer() {
        if (timer) return; // Prevent multiple intervals

        const periodLength = parseInt(document.getElementById('periodLength').value, 10);
        periodLengthInSeconds = periodLength * 60;

        timer = setInterval(() => {
            if (timeInSeconds < periodLengthInSeconds) {
                timeInSeconds++;
            }
            const minutes = String(Math.floor(timeInSeconds / 60)).padStart(2, '0');
            const seconds = String(timeInSeconds % 60).padStart(2, '0');
            let displayTime = `${minutes}:${seconds}`;

            if (timeInSeconds > periodLengthInSeconds) {
                const overtimeSeconds = timeInSeconds - periodLengthInSeconds;
                const overtimeMinutes = String(Math.floor(overtimeSeconds / 60)).padStart(2, '0');
                const overtimeDisplaySeconds = String(overtimeSeconds % 60).padStart(2, '0');
                displayTime = `${String(Math.floor(periodLengthInSeconds / 60)).padStart(2, '0')}:${String(periodLengthInSeconds % 60).padStart(2, '0')} + ${overtimeMinutes}:${overtimeDisplaySeconds}`;
            }

            document.getElementById('gameTime').value = displayTime;
            updateScore();
        }, 1000);
    }

    window.stopTimer = function stopTimer() {
        clearInterval(timer);
        timer = null;
        updateScore();
    }

    window.resetTimer = function resetTimer() {
        stopTimer();
        timeInSeconds = 0;
        document.getElementById('gameTime').value = "00:00";
        updateScore();
    }

    window.manualTimeChange = function manualTimeChange() {
        const timeInput = document.getElementById('gameTime').value;
        const [mainTime, overtime] = timeInput.split(' + ');
        const [minutes, seconds] = mainTime.split(':').map(Number);
        timeInSeconds = (minutes * 60) + seconds;

        if (overtime) {
            const [overtimeMinutes, overtimeSeconds] = overtime.split(':').map(Number);
            timeInSeconds += (overtimeMinutes * 60) + overtimeSeconds;
        }

        updateScore();
    }

    window.goToGameSetupPage = function goToGameSetupPage() {
        window.location.href = '/pages/html/game-setup.html';
    }

    window.copyOverlayUrl = function copyOverlayUrl() {
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
});
