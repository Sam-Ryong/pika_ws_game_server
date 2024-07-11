function handleMakeRoom(rooms, roomName, socket) {
  rooms[roomName] = new Set();
  rooms[roomName].add(socket);
}

export default handleMakeRoom();
