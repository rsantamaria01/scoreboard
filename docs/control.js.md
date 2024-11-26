# Documentation for 'control.js'

This file exports a utility for controlling game match functionality. 

Constants:
- **socket**: Instance of socket.
- **urlParams**: Parameters passed through URL.
- **gameId**: Id of the game fetched from url parameters.
- **overlayUrl**: URL for the game overlay.
- **currentPeriodIndex**: Index used to track current game period, initialized as 0.
- **isBreak**: Boolean value to check whether the current period is a break.

Functions:
- **setupPeriods(sport)**: Fetches sport related information and generates periods and break information for a game.
- **generatePeriods(sportInfo)**: Dynamically generates game periods based on the provided sport information.
- **nextPeriod()**: Switches to the next period of the game.
- **previousPeriod()**: Switches to the previous period of the game.
- **showBreak()**: Sets the game to a break period.
- **incrementScore(scoreId)**: Increments the score of a team.
- **decrementScore(scoreId)**: Decrements the score of a team.
- **updateScore()**: Updates the game score and communicates the changes to the server using WebSockets.
- **startTimer()**: Starts the game timer.
- **stopTimer()**: Stops the game timer.
- **resetTimer()**: Resets the game timer.
- **manualTimeChange()**: Updates the timeInSeconds when manual changes are made to the time.
- **goToGameSetupPage()**: Navigates to the game setup page.
- **copyOverlayUrl()**: Copies overlay url to clipboard.
- **showToast(message)**: Shows a toast notification with the provided message.

Events:
Upon loading, the script fetches game information (team names and sport) from the server and sets up periods for the game sport.

Helper functions `generatePeriods` and `setupPeriods` fetch and process sport data to generate game periods.

Publicly accessible functions `nextPeriod`, `previousPeriod`, `showBreak`, `incrementScore`, `decrementScore`, `startTimer`, `stopTimer`, `resetTimer`, `manualTimeChange`, `goToGameSetupPage`, `copyOverlayUrl` are associated with the `window` object, allowing them to handle clicks and other user interactions from the HTML page.

On calling the `updateScore` function, game score, time, period and break status are broadcasted to the server. 

Timer functionality (`startTimer`, `stopTimer`, `resetTimer`, `manualTimeChange`): Handles the game's on-going time management as well as the UI interactions like start, stop, reset and manual time change. The timer runs on a setInterval ticking every second and adds overtime when time overshoots. 

GUI related functionalities: `showToast` function, for displaying messages on the browser, and `copyOverlayUrl` function, for copying overlay URL to the clipboard. Additionally, game setup page navigation is handled by `goToGameSetupPage` function.