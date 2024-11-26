# Routes.js

This file sets up the routes for the server-side of a game application. It uses the multer middleware for handling multipart/form-data, which is primarily used for uploading files. It also handles basic CRUD (Create, Read, Update, Delete) operations for a database named 'db'.

## Dependencies

- `path`: A core Node.js module used for manipulating file and directory paths.
- `multer`: A middleware for handling multipart/form-data, which is primarily used for uploading files. It is used to process the files uploaded via the routes defined in this file.

## Functions

- `app.get('/')`: A get request to the root URL of the server redirects the client to the game setup page.

- `app.post('/api/games', upload.fields([{ name: 'logo1' }, { name: 'logo2' }])`: A POST request to the '/api/games' endpoint allows for creating a new game. It expects multipart/form-data, in the form of 'logo1' and 'logo2'. The logos are uploaded using multer. The body of the request should include the following properties: `team1, team2, sport`.

- `app.get('/api/games')`: A GET request to the '/api/games' endpoint allows for retrieving all games from the database.

- `app.get('/api/games/:id')`: A GET request to the '/api/games/:id' endpoint retrieves details of a specific game from the database. The ':id' is a placeholder for the game id.

- `app.get('/api/sports')`: A GET request to the '/api/sports' endpoint retrieves all sports from the database.

- `app.put('/api/games/:id')`: A PUT request to the '/api/games/:id' endpoint allows for updating the score of a specific game in the database, where ':id' is the gameId. The request body should include the properties `scoreA` and `scoreB`.

## Errors

Each endpoint returns a 500 status and a JSON object with an 'error' property when an error occurs during the operation. The JSON object includes a detailed error message.

## Exports

This file exports a single function that takes in the express `app` object, and sets up the server's routes on it.