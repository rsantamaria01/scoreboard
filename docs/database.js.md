# Database.js

This JavaScript file, 'database.js', connects to an SQLite database, defines schemas for two database tables, inserts initial data, and exports database functions. It is part of an application for managing games and sport information with SQLite. 

## Dependencies

- sqlite3: The SQLite3 module for Node.js,
- path: The built-in path module in Node.js.

## Connecting to Database

The file connects to an SQLite database under the path './db/scoreboard.db'. If the database does not exist, it gets created.

## Database Schema

### Games Table 

This table has the following fields: 

- 'id': An auto-incremental primary key.
- 'teamA': A text field representing the name of the first competing team.
- 'teamB': A text field representing the name of the second competing team.
- 'team1Logo' and 'team2Logo': Text fields for storing the logos of teams A and B respectively.
- 'sport': A text field for the sport type. 
- 'scoreA' and 'scoreB': Integer fields for storing the scores of team A and team B respectively. They are initialized as 0 (zero) by default.
- 'created_at': A timestamp for the time the game record was created, default value is the current timestamp.

### Sport Information Table 

This table stores information about different sports and has the following fields:

- 'id': An auto-incremental primary key.
- 'SportName': A text field representing the name of the sport.
- 'RegPeriod' and 'ExPeriod': Integer fields representing numbers of regular and extra periods in the sport respectively.
- 'RegPeriodName', 'ExPeriodName', 'PenaltyName', 'BreakName': Text fields representing the names of regular period, extra period, penalty, and break in the sport respectively.
- 'Penalty': An integer indicating whether a sport has penalties or not. 

## Database Functions

Following are the exported database functions along with their descriptions:

- `createGame(teamA, teamB, team1Logo, team2Logo, sport, callback)`: This function creates a new game record in the 'games' table and returns the last inserted id through the callback.

- `updateScore(gameId, scoreA, scoreB, callback)`: This function updates the scores of a specific game identified by its id.

- `getGameById(gameId, callback)`: This function retrieves a game record by id.

- `getAllGames(callback)`: This function retrieves all game records in the 'games' table.

- `getAllSports(callback)`: This function retrieves all sport records in the 'sportinformation' table.

The first parameter(s) for these functions are the necessary data for each operation, followed by a callback function which is called with an error (if any) and the result. 

## Exported Items

In the end, the database object, and all the above functions are exported for use in other parts of the application.