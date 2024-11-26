# Documentation for server.js

## Overview
This file is the main entry point of your application. It sets up and starts an Express.js server, configures middleware and routes, and initializes Socket.IO for real-time bidirectional event-based communication.

## Libraries Used
- **express**: Express.js is a fast, unopinionated, and minimalist web framework for Node.js. 
- **http**: http is an in-built module of Node.js used for setting up the low-level HTTP functionality.
- **socket.io**: Socket.io enables real-time bidirectional event-based communication between the browser and the server.
- **path**: The path module provides utilities for working with file and directory paths.

## Important Variables
- **app**: an instance of an express application.
- **server**: creates an HTTP server with the instance of express.
- **io**: Initialization of Socket.IO server.
- **PORT**: The port on which the Express server will be run, defaults to 3000 if process.env.PORT is not defined.

## Middleware
The following middleware is applied to the Express.js application:

- `express.json()`: This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
- `express.static(path.join(__dirname, '../public/'))`: This serves static files such as HTML, CSS, and JavaScript from a specified 'public' directory.
- `express.static(path.join(__dirname, '../uploads'))`: This serves static files from a directory called 'uploads'.

## Routes and Socket Handlers
Routes and socket handlers are imported from `./routes` and `./socket`, respectively, and applied to the Express application and Socket.IO server.

## Server Start
The server is started by calling `server.listen()`, and upon successfully starting, a message is logged to the console indicating the URL where the server is running.