// public/pages/js/overlay.js

const socket = io();
const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('gameId');

// Fetch team names, logos, and sport information from the server using the gameId
fetch(`/api/games/${gameId}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('team1Name').textContent = data.teamA || "Team 1";
        document.getElementById('team2Name').textContent = data.teamB || "Team 2";
        document.getElementById('team1Logo').src = data.team1Logo || 'https://static.vecteezy.com/system/resources/previews/023/579/944/original/illustration-of-soccer-logo-it-s-for-success-concept-png.png';
        document.getElementById('team2Logo').src = data.team2Logo || 'https://static.vecteezy.com/system/resources/previews/023/579/944/original/illustration-of-soccer-logo-it-s-for-success-concept-png.png';
        const sport = data.sport;
        setupInitialPeriod(sport);
    })
    .catch(error => console.error('Error fetching team information:', error));

// Listen for score updates from the control page
socket.on('scoreUpdate', (data) => {
    // Update scores, game timer, and period
    document.getElementById('team1Score').textContent = data.scoreA;
    document.getElementById('team2Score').textContent = data.scoreB;
    document.getElementById('gameTimer').textContent = data.time;
    document.getElementById('gamePeriod').textContent = data.period;

    // Hide the timer if it's a break
    if (data.isBreak) {
        document.getElementById('gameTimer').style.display = 'none';
    } else {
        document.getElementById('gameTimer').style.display = 'block';
    }
});

function setupInitialPeriod(sport) {
    fetch('/api/sports')
        .then(response => response.json())
        .then(data => {
            const sportInfo = data.find(s => s.SportName === sport);
            if (sportInfo) {
                const initialPeriod = `${1} ${sportInfo.RegPeriodName}`;
                document.getElementById('gamePeriod').textContent = initialPeriod;
                window.breakName = sportInfo.BreakName;
            } else {
                document.getElementById('gamePeriod').textContent = "Unknown Period";
            }
        })
        .catch(error => console.error('Error fetching sports information:', error));
}