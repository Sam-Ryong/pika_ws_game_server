function handlePermission(rooms, roomName, socket, data) {
  rooms[roomName].forEach((client) => {
    if (client !== socket && client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type: "permission",
          host: data.host,
          visitor: data.visitor,
          permission: data.permission,
        })
      );
    }
  });
}

module.exports = handlePermission;
