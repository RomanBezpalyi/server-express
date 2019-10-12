const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const setupDB = require("./helpers/setupDB");
const { toDosRoutes, authRoutes, orderRoutes } = require("./routes");
const toDo = require("./models/ToDo");
const ioSetup = require("./socket");

ioSetup.call(io);

setupDB();

app
  .use(morgan("dev"))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use("/auth", authRoutes)
  .use("/to-dos", toDosRoutes)
  .use("orders", orderRoutes)
  .use("/conns", (req, res, next) => {
    // res.json({ data: io.sockets })
    try {
      fs.asd();
    } catch (e) {
      next(e);
    }
  })
  .use("/parallel-reqs", async (req, res, next) => {
    const req1 = async () => toDo.find();
    const req2 = async () => toDo.find();

    const responses = await Promise.all([req1, req2]);
    res.json({ req1: responses[0], req2: responses[1] });
  })
  .use((err, req, res, next) => {
    return res.status(500).json({ e: err.stack });
  });

server.listen(process.env.PORT || 3000);
