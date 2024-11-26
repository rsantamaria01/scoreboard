## File: control.html

This is a HTML file pertaining to the game control panel of an application.

### DOCTYPE

The document type declaration specifies that this document is of HTML5 type.

### HTML `<html>`

The root element of an HTML page, where the language is set to English (`en`).

### HEAD `<head>`

The metadata about the HTML document is placed inside this element including:

- `charset`: Defines the character set used (UTF-8).
- `viewport`: Defines the viewport settings for responsiveness on different devices.  
- `title`: Specifies the title of the web page as "Game Control Panel".
- `link`: Specifies an external stylesheet at "../css/control.css".

### BODY `<body>`

The body of the document includes:

- A title ("Game Control Panel") in header 1 format.
- Two sections for team scores (`team-section`), each of which contains an incremented and decremented score for two different teams.
- A section (`period-section`) for controlling the game period featuring buttons that allow users to navigate between game periods and indicate breaks.
- A timer section (`time-section`) allows the user to set the length of game periods and control the game timer.
- An overlay URL section (`overlay-url-section`) that displays a read-only URL that can be copied on click.
- General controls, including a button to navigate back to the game setup page.

Specific functionalities:

- Functions are called using onClick events tied to various buttons - note these functions (such as `incrementScore`, `decrementScore`, etc.) are presumedly defined in the linked "control.js" file.
- Specific `id`s are assigned to HTML elements for further CSS customization or JavaScript functionalities.

Also, included on the page is a toast-style notification (`toast` class) that is presumably activated whenever the overlay URL is successfully copied.

### Scripts

Two scripts are linked at the bottom of the body. They are:

- A bibliographic script from Socket.IO: `<script src="/socket.io/socket.io.js"></script>`.
- A custom JavaScript file for controlling the behavior of the page: `<script src="../js/control.js"></script>`.