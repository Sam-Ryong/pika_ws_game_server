const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 3000 });

const rooms = {};

server.on("connection", (socket) => {
  console.log("A client connected");

  socket.on("message", (message) => {
    const { data, type, roomName } = parseMessage(message);
    if (type == "makeRoom") {
      handleMakeRoom(rooms, roomName, socket);
    } else if (type == "outRoom") {
      handleOutRoom(rooms, roomName, socket);
    } else if (type == "enterRoom") {
      handleEnterRoom(rooms, roomName, socket, data);
    } else if (type == "permission") {
      handlePermission(rooms, roomName, socket, data);
    } else if (type == "getRoom") {
      handleGetRoom(rooms, socket);
    } else if (type == "point") {
      handlePoint(rooms, roomName, data);
    } else {
      handleMessage(rooms, roomName, socket, data);
    }
  });

  // 클라이언트가 연결을 끊었을 때 처리하는 이벤트
  socket.on("close", () => {
    whenClose(rooms, socket);
  });
});

console.log("WebSocket server is running on ws://localhost:3000");
