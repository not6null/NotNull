import express from "express";
import { Server } from "socket.io";
import { auth } from "./middleware/auth.js";
import { messageHandler } from "./middleware/message.js";
import * as jwt_decode from "jwt-decode";
import error from "./middleware/error.js";
import dotenv from "dotenv";
import cors from "cors";
import "./models/db.js";

dotenv.config();

const app = express();
const io = new Server(8080, { cors: { origin: "*" } });
const client = [];

io.use(auth);

app.use(express.json());
app.use(cors());

import postRouter from "./routes/posts.js";
import userRouter from "./routes/users.js";
import storyRouter from "./routes/story.js";
import commentsRouter from "./routes/comments.js";
import rolesRouter from "./routes/role.js";
import reelsRouter from "./routes/reels.js";
import followerRouter from "./routes/follower.js";
import likeRouter from "./routes/like.js";
import messagesRouter from "./routes/message.js";

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/reels", reelsRouter);
app.use("/story", storyRouter);
app.use("/roles", rolesRouter);
app.use("/comments", commentsRouter);
app.use("/followers", followerRouter);
app.use("/likes", likeRouter);
app.use("/messages", messagesRouter);

const PORT = process.env.PORT || 5000;
app.use("*", (req, res) => res.status(404).json("NO content at this path"));
app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.use(error);
  console.log("connected");

  const user_id = socket.handshake.headers.user_id;
  client[user_id] = { socket_id: socket.id, user_id };
  console.log(client);
  socket.on("error", (error) => {
    socket.emit("error", { error: error.message });
  });

  messageHandler(socket, io);
  socket.on("disconnect", () => {
    console.log(socket.id);
    for (const key in client) {
      if (client[key].socket_id === socket.id) {
        delete client[key];
      }
    }
    console.log(client);
  });
});
