import express from "express";
import { createNewReels, getAllReels, deletedReels } from "../controller/reels.js";
import { authentication } from "../middleware/Authentication.js";

const reelsRouter = express.Router();

reelsRouter.post("/", authentication, createNewReels);
reelsRouter.get("/", getAllReels);
reelsRouter.delete("/:id", deletedReels);

export default reelsRouter;
