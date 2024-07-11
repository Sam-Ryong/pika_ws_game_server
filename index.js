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

  socket.on("close", () => {
    whenClose(rooms, socket);
  });
});

console.log("WebSocket server is running on ws://localhost:3000");
