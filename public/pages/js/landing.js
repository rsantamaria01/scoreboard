// public/pages/js/landing.js

function submitForm() {
    const form = document.getElementById('setupForm');
    const formData = new FormData(form);

    // Add default logos if not provided
    if (!formData.get('logo1').name) {
        formData.append('logo1', 'https://static.vecteezy.com/system/resources/previews/023/579/944/original/illustration-of-soccer-logo-it-s-for-success-concept-png.png');
    }
    if (!formData.get('logo2').name) {
        formData.append('logo2', 'https://static.vecteezy.com/system/resources/previews/023/579/944/original/illustration-of-soccer-logo-it-s-for-success-concept-png.png');
    }

    // Send data to the server
    fetch('/api/games', {
        method: 'POST',
        body: JSON.stringify({
            teamA: formData.get('team1'),
            teamB: formData.get('team2')
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.gameId) {
                // Redirect to control page with the game ID
                const redirectUrl = `/pages/html/control.html?gameId=${data.gameId}`;
                window.location.href = redirectUrl;
            } else {
                console.error("Failed to setup game");
            }
        })
        .catch(error => console.error('Error:', error));
}

// Prevent form from reloading the page when Enter is pressed
document.getElementById('setupForm').addEventListener('submit', (event) => {
    event.preventDefault();
});
