import express from "express";
import { createNewMessage, getAllMessage } from "../controller/message.js";
import { authentication } from "../middleware/Authentication.js";

const messagesRouter = express.Router();

messagesRouter.post("/:id", authentication, createNewMessage);
messagesRouter.get("/:id", authentication, getAllMessage);

export default messagesRouter;
