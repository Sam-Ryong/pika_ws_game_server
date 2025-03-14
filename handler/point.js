const WebSocket = require("ws");

function handlePoint(rooms, roomName, data) {
  if (rooms[roomName]) {
    if (rooms[roomName].size != 0) {
      rooms[roomName].forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
        }
      });
    }
  }
}

module.exports = handlePoint;
