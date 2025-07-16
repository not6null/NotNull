import express from "express";
import {
  createNewCommentPost,
  createNewCommentStory,
  createNewCommentReels,
  getCommentByPostId,
  getCommentByStoryId,
  getCommentByReelsId,
  updateCommentPostById,
  updateCommentStoryById,
  updateCommentReelById,
  deleteCommentPost,
  deleteCommentStory,
  deleteCommentReels,
} from "../controller/comments.js";

import { authentication } from "../middleware/Authentication.js";

const commentsRouter = express.Router();

commentsRouter.post("/post/:id", authentication, createNewCommentPost);
commentsRouter.post("/story/:id", authentication, createNewCommentStory);
commentsRouter.post("/reels/:id", authentication, createNewCommentReels);
commentsRouter.get("/post/:id", getCommentByPostId);
commentsRouter.get("/story/:id", getCommentByStoryId);
commentsRouter.get("/reels/:id", getCommentByReelsId);
commentsRouter.put("/post/:id", authentication, updateCommentPostById);
commentsRouter.put("/story/:id", authentication, updateCommentStoryById);
commentsRouter.put("/reels/:id", authentication, updateCommentReelById);
commentsRouter.delete("/post/:id", authentication, deleteCommentPost);
commentsRouter.delete("/story/:id", authentication, deleteCommentStory);
commentsRouter.delete("/reels/:id", authentication, deleteCommentReels);

export default commentsRouter;
