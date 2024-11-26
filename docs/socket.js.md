## `server/socket.js`

This module exports a single function that sets event handlers on a provided socket.io instance (`io`). 

### Usage

```js
const io = require('socket.io')(http);
const handleSocketIOEvents = require('./server/socket.js');

handleSocketIOEvents(io);
```

### Event Handlers

#### `'connection'`

This event is triggered when a client connects to the server. It logs 'New client connected' to the console and sets further event handlers on the individual client's socket.

##### `'updateScore'`

This event is expected to be emitted by clients. It should be passed an object (`data`) that represents the new score. It forwards this information to all connected sockets by emitting a `'scoreUpdate'` event.

```js
{
  // Clients should emit the 'updateScore' event as follows
  'updateScore', { /* score object */ };
}
```

The function broadcasts the received `data` object to all connected sockets (clients) by emitting 'scoreUpdate' event.

##### `'disconnect'`

This event is triggered when a client disconnects from the server (either intentionally or due to network errors). The function logs 'Client disconnected' to the console when this event received from a client.

In general, this module serves the purpose of handling socket connections, receiving updates from the client about score changes and broadcasting these updates to all the clients, and handling disconnections.