const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 3000 });

server.on("connection", (socket) => {
  console.log("A client connected");

  // 클라이언트로부터 메시지를 받았을 때 처리하는 이벤트
  socket.on("message", (message) => {
    // console.log("Received message:", message);
    const decodedMessage = message.toString("utf-8");
    console.log("Received message:", decodedMessage);
    // 받은 메시지를 모든 클라이언트에게 전송
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(decodedMessage);
      }
    });
  });

  // 클라이언트가 연결을 끊었을 때 처리하는 이벤트
  socket.on("close", () => {
    console.log("A client disconnected");
  });
});

console.log("WebSocket server is running on ws://localhost:3000");
