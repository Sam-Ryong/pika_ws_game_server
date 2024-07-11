function handleGetRoom(rooms, socket) {
  const roomList = Object.keys(rooms);
  socket.send(JSON.stringify({ type: "getRoom", roomList: roomList }));
}

module.exports = handleGetRoom;
