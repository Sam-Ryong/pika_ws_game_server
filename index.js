const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 3000 });

const rooms = {};

server.on("connection", (socket) => {
  console.log("A client connected");

  socket.on("message", (message) => {
    const data = JSON.parse(message.toString("utf-8"));
    const type = data.type;
    const roomName = data.host;

    if (type == "makeRoom") {
      rooms[roomName] = new Set();
      rooms[roomName].add(socket);
    } else if (type == "outRoom") {
      rooms[roomName].delete(socket);
      if (rooms[roomName].size === 0) {
        delete rooms[roomName];
      }
      rooms[roomName].forEach((client) => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({ type: "visitorOut", visitor: data.visitor })
          );
        }
      });
    } else if (type == "enterRoom") {
      if (!rooms[roomName]) {
        socket.send(JSON.stringify({ type: "noRoom", host: data.host }));
      } else {
        if (rooms[roomName].length >= 2) {
          socket.send(JSON.stringify({ type: "fullRoom", host: data.host }));
        } else {
          rooms[roomName].forEach((client) => {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
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
    } else if (type == "permission") {
      rooms[roomName].forEach((client) => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          console.log("send permission");
          console.log(data.permission);
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
    } else if (type == "getRoom") {
      const roomList = Object.keys(rooms);
      socket.send(JSON.stringify({ type: "getRoom", roomList: roomList }));
      console.log(roomList);
    } else {
      rooms[roomName].forEach((client) => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
        }
      });
    }
  });

  // 클라이언트가 연결을 끊었을 때 처리하는 이벤트
  socket.on("close", () => {
    Object.keys(rooms).forEach((roomName) => {
      if (rooms[roomName].has(socket)) {
        rooms[roomName].delete(socket);
        console.log(`클라이언트가 ${roomName} 방에서 나갔습니다.`);

        // 방에 남아 있는 클라이언트가 없으면 방 삭제
        if (rooms[roomName].size === 0) {
          delete rooms[roomName];
          console.log(`${roomName} 방이 삭제되었습니다.`);
        }
      }
    });
    console.log("A client disconnected");
  });
});

console.log("WebSocket server is running on ws://localhost:3000");
