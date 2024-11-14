// server/routes.js
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Set the destination for uploaded files

module.exports = (app) => {
    // Redirect root URL to landing page
    app.get('/', (req, res) => {
        res.redirect('/pages/html/landing.html');
    });

    // Other routes (e.g., /api/games, /api/games/:id)
    const db = require('../db/database');

    app.post('/api/games', upload.fields([{ name: 'logo1' }, { name: 'logo2' }]), (req, res) => {
        const { team1, team2, sport } = req.body;
        const team1Logo = req.files['logo1'] ? `/uploads/${req.files['logo1'][0].filename}` : req.body.logo1;
        const team2Logo = req.files['logo2'] ? `/uploads/${req.files['logo2'][0].filename}` : req.body.logo2;

        db.createGame(team1, team2, team1Logo, team2Logo, sport, (err, gameId) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to create game' });
            }
            res.json({ gameId });
        });
    });

    app.get('/api/games', (req, res) => {
        db.getAllGames((err, games) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to fetch games' });
            }
            res.json(games);
        });
    });

    app.get('/api/games/:id', (req, res) => {
        const gameId = req.params.id;
        db.getGameById(gameId, (err, game) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to fetch game' });
            }
            res.json(game);
        });
    });

    app.get('/api/sports', (req, res) => {
        db.getAllSports((err, sports) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to fetch sports' });
            }
            res.json(sports);
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