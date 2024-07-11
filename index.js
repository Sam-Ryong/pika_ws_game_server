const WebSocket = require("ws");
const handleMakeRoom = require("./handler/makeRoom.js");
const handleOutRoom = require("./handler/outRoom.js");
const handleEnterRoom = require("./handler/enterRoom.js");
const handlePermission = require("./handler/permission.js");
const handleGetRoom = require("./handler/getRoom.js");
const handlePoint = require("./handler/point.js");
const handleMessage = require("./handler/messageHandler.js");
const whenClose = require("./handler/close.js");
const parseMessage = require("./handler/messageParser.js");

const server = new WebSocket.Server({ port: 3000 });

const rooms = {};

server.on("connection", (socket) => {
  console.log("A client connected");

  socket.on("message", (message) => {
    const { data, type, roomName } = parseMessage(message);

    switch (type) {
      case "makeRoom":
        handleMakeRoom(rooms, roomName, socket);
        break;
      case "outRoom":
        handleOutRoom(rooms, roomName, socket);
        break;
      case "enterRoom":
        handleEnterRoom(rooms, roomName, socket, data);
        break;
      case "permission":
        handlePermission(rooms, roomName, socket, data);
        break;
      case "getRoom":
        handleGetRoom(rooms, socket);
        break;
      case "point":
        handlePoint(rooms, roomName, data);
        break;
      default:
        handleMessage(rooms, roomName, socket, data);
        break;
    }
  });

  socket.on("close", () => {
    whenClose(rooms, socket);
  });
});

console.log("WebSocket server is running on ws://localhost:3000");
