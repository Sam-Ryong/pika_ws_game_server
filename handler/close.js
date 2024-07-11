function whenClose(rooms, socket) {
  Object.keys(rooms).forEach((roomName) => {
    if (rooms[roomName].has(socket)) {
      rooms[roomName].delete(socket);
      rooms[roomName].forEach((client) => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          console.log("giveup 보내짐");

          client.send(
            JSON.stringify({
              type: "giveUp",
              host: "giveUp",
            })
          );
        }
      });
      console.log(`클라이언트가 ${roomName} 방에서 나갔습니다.`);

      // 방에 남아 있는 클라이언트가 없으면 방 삭제
      if (rooms[roomName].size === 0) {
        delete rooms[roomName];
        console.log(`${roomName} 방이 삭제되었습니다.`);
      }
    }
  });
  console.log("A client disconnected");
}
