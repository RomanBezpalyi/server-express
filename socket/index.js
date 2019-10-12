module.exports = function() {
  const io = this;

  io.on("connection", socket => {
    console.log("client", socket.id, "connected");

    socket.join("private-room");
    socket.on("message", data => {
      console.log(data);

      socket.broadcast.emit("message", "broadcast");
      io.emit("message", "io glob");
    });

    socket.on("join", data => {
      const room = data;
      console.log("data", data);

      socket.join(room);

      console.log("connected to", room, "user", socket.id);

      io.clients((err, clients) => console.log("general", clients));
      io.in(room).clients((err, clients) => console.log("room", clients));
    });

    socket.on("send-to-room", data => {
      const { room, msg } = data;
      socket.broadcast.to(room).send(msg);
    });
  });
};
