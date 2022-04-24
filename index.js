const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const timerRoutes = require("./routes/timetracker");
const app = express();
const socket = require("socket.io");
require("dotenv").config();
// var fileupload = require("express-fileupload");

app.use(cors());
app.use(express.json());

//Allow Express par
// app.use(fileupload());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/timer", timerRoutes);
app.use('/', (req, res) => {
  return res.json("welcome to the new world")
})

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
const io = socket(server, {
  cors: {
    origin: "https://beamish-smakager-d84bf5.netlify.app", //https://beamish-smakager-d84bf5.netlify.app //http://localhost:3000
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
  
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data);
    }
  });
});
