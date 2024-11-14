// public/overlay.js

const socket = io();

// Listen for score updates from the control page
socket.on('scoreUpdate', (data) => {
    // Update team names, scores, and game timer
    document.getElementById('team1Name').textContent = data.team1Name;
    document.getElementById('team1Score').textContent = data.scoreA;
    document.getElementById('team2Name').textContent = data.team2Name;
    document.getElementById('team2Score').textContent = data.scoreB;
    document.getElementById('gameTimer').textContent = data.time;

    // Update logos if provided
    if (data.team1Logo) {
        document.getElementById('team1Logo').src = data.team1Logo;
    }
    if (data.team2Logo) {
        document.getElementById('team2Logo').src = data.team2Logo;
    }
});
