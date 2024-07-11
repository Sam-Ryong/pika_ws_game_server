function handleEnterRoom(rooms, roomName, socket, data) {
  if (!rooms[roomName]) {
    console.log("noRoom 보내짐");
    socket.send(JSON.stringify({ type: "noRoom", host: data.host }));
  } else {
    if (rooms[roomName].length >= 2) {
      console.log("fullRoom 보내짐");
      socket.send(JSON.stringify({ type: "fullRoom", host: data.host }));
    } else {
      rooms[roomName].forEach((client) => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          console.log("roomAccess 보내짐");
          client.send(
            JSON.stringify({
              type: "roomAccess",
              host: data.host,
              visitor: data.visitor,
            })
          );
        }
      });
      rooms[roomName].add(socket);
    }
  }
}
