const express = require("express");
const {
  createNewCommentPost,
  createNewCommentStory,
  createNewCommentReels,
  getCommentByPostId,
  getCommentByStoryId,
  getCommentByReelsId,
  updateCommentPostById,
  updateCommentStoryById,
} = require("../controller/comments");

//controllers
//middleware
const authentication = require("../middleware/Authentication");
// const authorization = require("../middleware/Authorization");

const commentsRouter = express.Router();

commentsRouter.post("/post/:id", authentication, createNewCommentPost);
commentsRouter.post("/story/:id", authentication, createNewCommentStory);
commentsRouter.post("/reels/:id", authentication, createNewCommentReels);
commentsRouter.get("/post/:id", getCommentByPostId);
commentsRouter.get("/story/:id", getCommentByStoryId);
commentsRouter.get("/reels/:id", getCommentByReelsId);
commentsRouter.put("/post/:id", updateCommentPostById);
commentsRouter.put("/story/:id", authentication, updateCommentStoryById);

module.exports = commentsRouter;
