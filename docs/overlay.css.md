# Overlay CSS Documentation

This CSS file, `overlay.css`, provides the styles for a webpage displaying a scoreboard and team representation, potentially for a sports event.

## CSS Classes

Here is the list of CSS classes used in the file along with their functionality:

- `body`: Contains general styles for entire document body. Font is set to Arial and Sans-serif, background color is transparent, and the elements are flexibly aligned from left to top start of the screen with full viewport height. 

- `scoreboard`: Styled as a vertically aligned flexible container, with transparency, and a black border radius. It will resize as needed without breaching the maximum width of 1200px.

- `row`: A generalized utility for arranging items in a center-aligned row, with a width filling its parent. This is suitable for creating a row for each team's scores.

- `team`: As a part of the row, each team is a flexible container with center-aligned items. It holds a team's image and name, and it ensures a fair distribution of screen space by growing flexibly.

    - `team img`: Styles for the team logos, displayed as a round image.  

    - `team div`: Styles for the team's name enclosed inside the `team` class. It shows bold, truncated text.

- `score`: Styles the text displaying the score of each team. It is bold and scaled larger than normal text for easy visibility.

- `spacer`: Utility for creating flexible spaces, providing a more relaxed space around elements while keeping the structure well distributed.

- `space`: Utility for creating fixed spaces of 10px.

- `timer` and `period`: Styles for time and game period information, displayed slightly larger than normal text and in bold.

The file provides easy to understand and straightforward class selectors to help in managing a neat and responsive sports scoreboard layout.