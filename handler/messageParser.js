function parseMessage(message) {
  const data = JSON.parse(message.toString("utf-8"));
  const type = data.type;
  const roomName = data.host;
  return { data, type, roomName };
}
