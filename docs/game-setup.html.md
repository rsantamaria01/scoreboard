# Documentation for game-setup.html File

## Overview
The `game-setup.html` file is a web page where users can set up a new game, inputting details such as team names, team logos, and selection of sport for the game. The page also provides a section for viewing past games.

## Details

### DOCTYPE Declaration

The `<!DOCTYPE html>` at the beginning of the file specifies that this document is HTML5.

### HTML Language

The `<html lang="en">` tag specifies that the language of this document is English.

### Meta Tags

- `<meta charset="UTF-8">`: This specifies the character encoding for the document.
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`: This tag makes the website responsive and allows it to scale properly on all devices. 

### Title

The `<title>` tag defines the title of the document (Game Setup Page).

### Link Tag

The `<link rel="stylesheet" href="../css/game-setup.css">` tag includes a CSS file that styles this document.

### Body Structure

The `<body>` contains two main blocks within a container div:

1. **Game setup block**: This block contains a form that lets the user input details for a new game. Components in this block include:
   - Input fields for Team 1 and Team 2 names, with id `team1` and `team2`, respectively.
   - Input fields for Team 1 and Team 2 logos, with id `logo1` and `logo2`, respectively, that accepts only images files.
   - A select field for specifying the sport of the game, and a button to submit the form.

2. **Past games block**: This block contains an element with id `pastGames` which is reserved for loading past games.

### Script Tag

The `<script src="../js/game-setup.js"></script>` tag at the end of the body section is referencing a JavaScript file where game setup functionalities, including form submission and past games loading, are expected to be defined.