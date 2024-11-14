// public/overlay.js

const socket = io();
const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('gameId');

// Fetch team names and logos from the server using the gameId
fetch(`/api/games/${gameId}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('team1Name').textContent = data.teamA || "Team 1";
        document.getElementById('team2Name').textContent = data.teamB || "Team 2";
        document.getElementById('team1Logo').src = data.team1Logo || 'https://static.vecteezy.com/system/resources/previews/023/579/944/original/illustration-of-soccer-logo-it-s-for-success-concept-png.png';
        document.getElementById('team2Logo').src = data.team2Logo || 'https://static.vecteezy.com/system/resources/previews/023/579/944/original/illustration-of-soccer-logo-it-s-for-success-concept-png.png';
    })
    .catch(error => console.error('Error fetching team information:', error));

// Listen for score updates from the control page
socket.on('scoreUpdate', (data) => {
    // Update scores, game timer, and period
    document.getElementById('team1Score').textContent = data.scoreA;
    document.getElementById('team2Score').textContent = data.scoreB;
    document.getElementById('gameTimer').textContent = data.time;
    document.getElementById('gamePeriod').textContent = data.period;
});