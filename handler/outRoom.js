function handleOutRoom(rooms, roomName, socket) {
  if (rooms[roomName]) {
    rooms[roomName].delete(socket);
    if (rooms[roomName].size === 0) {
      delete rooms[roomName];
    }
  }
  socket.send(JSON.stringify({ type: "outDone" }));
}
