// db/database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Set database path and connect to SQLite database (or create it if it doesn't exist)
const dbPath = path.resolve(__dirname, '../db/scoreboard.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Create a "games" table if it doesn’t exist
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS games (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            teamA TEXT,
            teamB TEXT,
            scoreA INTEGER DEFAULT 0,
            scoreB INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
});

// Functions to interact with the database
function createGame(teamA, teamB, callback) {
    db.run(
        'INSERT INTO games (teamA, teamB) VALUES (?, ?)',
        [teamA, teamB],
        function (err) {
            if (err) {
                console.error(err.message);
                callback(err);
            } else {
                callback(null, this.lastID);
            }
        }
    );
}

function updateScore(gameId, scoreA, scoreB, callback) {
    db.run(
        'UPDATE games SET scoreA = ?, scoreB = ? WHERE id = ?',
        [scoreA, scoreB, gameId],
        function (err) {
            if (err) {
                console.error(err.message);
                callback(err);
            } else {
                callback(null);
            }
        }
    );
}

// Export the database connection and functions for use in other parts of the app
module.exports = {
    db,
    createGame,
    updateScore,
};
