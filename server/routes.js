// server/routes.js
const path = require('path');

module.exports = (app) => {
    // Redirect root URL to landing page
    app.get('/', (req, res) => {
        res.redirect('/pages/html/landing.html');
    });
    
    // Other routes (e.g., /api/games, /api/games/:id)
    const db = require('../db/database');

    app.post('/api/games', (req, res) => {
        const { teamA, teamB } = req.body;
        db.createGame(teamA, teamB, (err, gameId) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to create game' });
            }
            res.json({ gameId });
        });
    });

    app.put('/api/games/:id', (req, res) => {
        const gameId = req.params.id;
        const { scoreA, scoreB } = req.body;
        db.updateScore(gameId, scoreA, scoreB, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to update score' });
            }
            res.json({ message: 'Score updated successfully' });
        });
    });
};
