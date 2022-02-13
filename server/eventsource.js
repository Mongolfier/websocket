const express = require("express");
const cors = require("cors");
const events = require("events");
const PORT = 5000;

const emitter = new events.EventEmitter();

const app = express();

app.use(cors());
app.use(express.json())

app.get("/connect", (request, response) => {
    response.writeHead(200, {
        "Connection": "keep-alive",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
    });
    emitter.on("newMessage", (message) => {
        response.write(`data: ${JSON.stringify(message)} \n\n`);
    })
});

app.post("/new-messages", ((request, response) => {
    const message = request.body;
    emitter.emit("newMessage", message);
    response.status(200);
}));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));