const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

const users = {};
const messages = [];

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("set username", (username) => {
    users[socket.id] = username;
    socket.username = username;
    socket.emit("init messages", messages);
  });

  socket.on("chat message", (msgObj) => {
    if (!socket.username) return;

    const message = {
      id: Date.now(),
      user: socket.username,
      content: msgObj.content,
      time: new Date().toLocaleTimeString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      timeISO: new Date(),
      replyTo: msgObj.replyTo || null,
      status: "sent",
    };
    messages.push(message);

    io.emit("chat message", message);
  });

  socket.on("typing", () => {
    socket.broadcast.emit("typing", socket.username);
  });

  socket.on("stop typing", () => {
    socket.broadcast.emit("stop typing");
  });

  socket.on("messages read", () => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (
        messages[i].user === socket.username &&
        messages[i].status !== "read"
      ) {
        messages[i].status = "read";
        io.emit("message read", messages[i].id);
        break;
      }
    }
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
