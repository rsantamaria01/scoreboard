# overlay.html Documentation

This HTML document is for a Live Scoreboard Overlay web page. 

## Meta Tags 
The `<head>` section contains the meta charset tag `UTF-8`, ensuring the correct character encoding for the document. In this section, there's also a viewport meta tag that sets the width of the page to follow the screen-width of the device, and initializes the zoom level to 1.

## Title
The title of the page is `Live Scoreboard Overlay`.

## External Files
There are external references to a CSS file `overlay.css` for styling and two JavaScript files `socket.io.js` and `overlay.js`, located in the `socket.io` root directory and `js` directory respectively.

## Body Structure
The `<body>` consists of a parent div class called `.scoreboard` with multiple child div elements. 

### Team Elements
The `.scoreboard` div contains two `.row` div elements.

1. The first `.row` div includes two `.team` divs with IDs `team1` and `team2`. Each team div contains:
    - An image with ID `team#Logo` (where # is the team number) for displaying team logo.
    - Div elements with IDs `team#Name` and `team#Score` for displaying the team's name and score. 
    - Divs with class `.space` are used for spacing between the elements.

2. The second `.row` div contains:
    - A `.timer` div with ID `gameTimer`, which displays the game timer.
    - A `.period` div with ID `gamePeriod`, which shows the current period of the game.

All of the identifiers (IDs) used in this document are intended to be references for JavaScript to dynamically update content on the page.

## Dependencies
This html file depends on:
- `overlay.css` for its styling
- `socket.io/socket.io.js` and `../js/overlay.js` to handle the socket connections and overlay respectively.