import express from "express";
import { CreateLike, deleteLike, getLikeById, getAllLikes } from "../controller/like.js";
import { authentication } from "../middleware/Authentication.js";

const likeRouter = express.Router();

likeRouter.post('/search/:id', authentication, CreateLike);
likeRouter.delete('/delete/:id', authentication, deleteLike);
likeRouter.get("/:id", getLikeById);
likeRouter.get("/", getAllLikes);

export default likeRouter;