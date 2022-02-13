const ws = require("ws");

const wsServer = new ws.Server({
  port: 5000,
}, () => console.log("Server started on 5000"))

wsServer.on("connection", function connection(ws) {
  ws.on("message", function (message) {
    message = JSON.parse(message)
    switch (message.event) {
      case "message":
        broadcastMessage(message)
        break;
      case 'connection':
        broadcastMessage(message)
        break;
    }
  })
})

function broadcastMessage(message, id) {
  wsServer.clients.forEach(client => {
      client.send(JSON.stringify(message))
  })
}