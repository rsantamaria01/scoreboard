# overlay.js

This file contains the client-side JavaScript needed to operate a live sports game overlay. The overlay shows information like team names, logos, scores, game timer, and the current game period. This document will provide a walk through for each significant portion of the file.

`socket` is an instance of socket.io used to communicate with the server in real-time. `urlParams` and `gameId` use the URLSearchParams interface to work with the query string of the current page URL and retrieve the 'gameId' parameter respectively. 

The fetch API is used to asynchronously retrieve the game details provided a 'gameId'. It modifies the inner text and source of the HTML elements with the id 'team1Name', 'team2Name', 'team1Logo' and 'team2Logo'. It also calls a function `setupInitialPeriod()` with the fetched 'sport' data. If there's an error during this fetch, it logs the error message to the console.

`setupInitialPeriod(sport)` is a function that fetches sports information and sets the initial period text of the current game. It finds the sport information by matching the 'SportName'. If valid sport information is found, it sets the game period content and also sets a global 'breakName' property. If a sport match is not found, it replaces the game period content with "Unknown Period". If there's an error, it logs it to the console.

`socket.on('scoreUpdate', (data) => {...})` - this is a socket.io event listener that waits for real-time data with the event name 'scoreUpdate'. Whenever the server sends an update with this event, this function executes updating the content of the HTML elements with id 'team1Score', 'team2Score', 'gameTimer', and 'gamePeriod'. If it's a period break, it hides the game timer. 

Overall, this script is used to keep a live updating overlay for a sports game that gets updated in real time with the team details, scores, timing and period updates.