// server/socket.js
module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('updateScore', (data) => {
      io.emit('scoreUpdate', data); // Broadcast score update to all connected clients
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};
