const ws = require("ws");

const wsServer = new ws.Server({
  port: 5000,
}, () => console.log("Server started!"))

wsServer.on("connection",  (ws) => {
  ws.on("message", (message) => {
    message = JSON.parse(message);
    console.log(message)
    switch (message.event) {
      case "message":
        broadcastMessage(message)
        break;
      case "connection":
        broadcastMessage(message)
        break;
    }
  })
})

function broadcastMessage(message) {
  console.log(message)
  wsServer.clients.forEach(client => {
    client.send(JSON.parse(message))
  })
}