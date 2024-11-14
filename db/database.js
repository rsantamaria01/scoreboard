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

// Create tables if they don’t exist
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS games (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            teamA TEXT,
            teamB TEXT,
            team1Logo TEXT,
            team2Logo TEXT,
            sport TEXT,
            scoreA INTEGER DEFAULT 0,
            scoreB INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS sportinformation (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            SportName TEXT,
            RegPeriod INTEGER,
            RegPeriodName TEXT,
            ExPeriod INTEGER,
            ExPeriodName TEXT,
            Penalty INTEGER,
            PenaltyName TEXT
        )
    `);

    // Insert initial data into the sports table if it is empty
    db.get('SELECT COUNT(*) AS count FROM sportinformation', (err, row) => {
        if (err) {
            console.error('Error checking sports table', err);
        } else if (row.count === 0) {
            const sportsData = [
                { SportName: 'Soccer/Football', RegPeriod: 2, RegPeriodName: 'Halves', ExPeriod: 2, ExPeriodName: 'Extra Periods', Penalty: 1, PenaltyName: 'Penalty Shootout' },
                { SportName: 'Basketball', RegPeriod: 4, RegPeriodName: 'Quarters', ExPeriod: 1, ExPeriodName: 'Overtime', Penalty: 0, PenaltyName: '-' },
                { SportName: 'American Football (NFL)', RegPeriod: 4, RegPeriodName: 'Quarters', ExPeriod: 1, ExPeriodName: 'Overtime', Penalty: 0, PenaltyName: '-' },
                { SportName: 'Ice Hockey', RegPeriod: 3, RegPeriodName: 'Periods', ExPeriod: 1, ExPeriodName: 'Overtime', Penalty: 1, PenaltyName: 'Shootout' },
                { SportName: 'Baseball', RegPeriod: 9, RegPeriodName: 'Innings', ExPeriod: 0, ExPeriodName: '-', Penalty: 0, PenaltyName: '-' },
                { SportName: 'Tennis', RegPeriod: 3, RegPeriodName: 'Sets', ExPeriod: 0, ExPeriodName: '-', Penalty: 1, PenaltyName: 'Tie-Break' },
                { SportName: 'Rugby Union', RegPeriod: 2, RegPeriodName: 'Halves', ExPeriod: 2, ExPeriodName: 'Extra Periods', Penalty: 0, PenaltyName: '-' },
                { SportName: 'Cricket (One-Day International)', RegPeriod: 2, RegPeriodName: 'Innings', ExPeriod: 0, ExPeriodName: '-', Penalty: 0, PenaltyName: '-' },
                { SportName: 'Cricket (T20)', RegPeriod: 2, RegPeriodName: 'Innings', ExPeriod: 0, ExPeriodName: '-', Penalty: 0, PenaltyName: '-' },
                { SportName: 'Handball', RegPeriod: 2, RegPeriodName: 'Halves', ExPeriod: 2, ExPeriodName: 'Extra Periods', Penalty: 0, PenaltyName: '-' },
                { SportName: 'Rugby League', RegPeriod: 2, RegPeriodName: 'Halves', ExPeriod: 1, ExPeriodName: 'Golden Point', Penalty: 0, PenaltyName: '-' }
            ];

            const insertStmt = db.prepare('INSERT INTO sportinformation (SportName, RegPeriod, RegPeriodName, ExPeriod, ExPeriodName, Penalty, PenaltyName) VALUES (?, ?, ?, ?, ?, ?, ?)');
            sportsData.forEach(sport => {
                insertStmt.run(sport.SportName, sport.RegPeriod, sport.RegPeriodName, sport.ExPeriod, sport.ExPeriodName, sport.Penalty, sport.PenaltyName);
            });
            insertStmt.finalize();
        }
    });
});

// Functions to interact with the database
function createGame(teamA, teamB, team1Logo, team2Logo, sport, callback) {
    db.run(
        'INSERT INTO games (teamA, teamB, team1Logo, team2Logo, sport) VALUES (?, ?, ?, ?, ?)',
        [teamA, teamB, team1Logo, team2Logo, sport],
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

function getGameById(gameId, callback) {
    db.get(
        'SELECT teamA, teamB, team1Logo, team2Logo, sport FROM games WHERE id = ?',
        [gameId],
        (err, row) => {
            if (err) {
                console.error(err.message);
                callback(err);
            } else {
                callback(null, row);
            }
        }
    );
}

function getAllGames(callback) {
    db.all(
        'SELECT id, teamA, teamB FROM games',
        (err, rows) => {
            if (err) {
                console.error(err.message);
                callback(err);
            } else {
                callback(null, rows);
            }
        }
    );
}

function getAllSports(callback) {
    db.all(
        'SELECT SportName, RegPeriod, RegPeriodName, ExPeriod, ExPeriodName, Penalty, PenaltyName FROM sportinformation',
        (err, rows) => {
            if (err) {
                console.error(err.message);
                callback(err);
            } else {
                callback(null, rows);
            }
        }
    );
}

// Export the database connection and functions for use in other parts of the app
module.exports = {
    db,
    createGame,
    updateScore,
    getGameById,
    getAllGames,
    getAllSports,
};