function handleMessage(rooms, roomName, socket, data) {
  if (rooms[roomName]) {
    if (rooms[roomName].size != 0) {
      rooms[roomName].forEach((client) => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
        }
      });
    }
  }
}

export default handleMessage();
