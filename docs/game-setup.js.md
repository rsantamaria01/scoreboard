# Documentation for game-setup.js

The `game-setup.js` file is a JavaScript module that facilities the game setup process. This includes form submission for starting new games, fetching and displaying past games, and fetching and populating a dropdown menu with sports available. All of these operations are performed by making HTTP requests (using the fetch API) to specific server-endpoints. The key functions in this module includes:

## Functions

1. `submitForm()`: This function manages the form submission process for starting new games. It retrieves the form, and if the logos for logo1 and logo2 are not included, it sets them to a default value. It then sends this data to the server using a POST request. Upon successful submission, it redirects to the game control page with the game ID attached to the URL. If any error occurs the error will be logged to the console

2. `loadPastGames()`: This function retrieves past games data from the server. It creates and attaches a click event on each of the retrieved games that upon being clicked redirects the user to control that specific game.

3. `loadSports()`: This function fetches the available sports from the server and populates the sport dropdown on the form. Any errors that occur during these fetch processes are logged to the console

Furthermore, the module sets an event listener on the form that prevents the page from reloading when the form is submitted. It also defines an onload event for the window that triggers the `loadPastGames()` and `loadSports()` functions, effectively loading past games and sports whenever the page is loaded.