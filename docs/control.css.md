# CSS Documentation: control.css

This CSS file dictates the styling for public pages of the application.

## Body

The body of the page is styled with the Arial font (with a sans-serif fallback). It uses a flex layout that centers its contents both horizontally and vertically. The height of the body is set to the full viewport height. There's no margin, and the background color is a light shade of grey.

## Container

The container class is used for elements that should occupy 100% of their parent's width but be constrained to a maximum width of 500px. The container has a white background, 20px of padding, and slightly rounded corners. A light shadow is applied for depth, and its text is centered.

## Headings

Headings on the page are dark grey. There's a significant margin beneath each h1 element (20px), and h2 elements are slightly larger than standard text with a smaller bottom margin.

## Sections

There's additional margin between sections of content (20px in all directions). 

## Labels

Labels are block elements (taking up their own line) and are bold. They have a small top margin.

## Input fields
 
Input fields (both number and text types) have a width of 100px, centered text, and a slight padding for ease of reading and input. They also have minor styling for a border, rounded corners and small margins.

## Buttons
 
Buttons are styled with a green background, white text, and rounded corners. They have a slight top and bottom margin, and change color when hovered over for better user interaction. The cursor is also styled as a pointer when hovering over buttons to denote clickable action.

## Update Score Button

The `updateScoreButton` element, presumably a button, gets some additional styles. Its width is set to 100%, padding is larger, and it has some extra margin at the top.

## Toast Notifications

Elements with the 'toast' class are styled as notifications. They're positioned fixedly at the bottom of the viewport and are hidden by default. They have a dark background, white text, and slight roundness to the corners.

The 'show' class can be added to make a toast visible. When applied, it triggers a fade-in and then fade-out animation.

## Animations

Two animations are declared using keyframes. `fadein` and `fadeout` both animate an element's `bottom` (vertical position) and `opacity` properties to make the element appear and disappear smoothly. These are applied to the "toast" notifications.