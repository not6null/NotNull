import express from "express";
import {
  getAllPost,
  updatePost,
  deletePostById,
  createNewPost,
  getPostByAuthor,
  getPostById,
  getAllPostsUser,
  getAllPostsFollowers
} from "../controller/posts.js";
import authorization from "../middleware/Authorization.js";
import { authentication } from "../middleware/Authentication.js";

const postRouter = express.Router();

postRouter.get("/", getAllPost);
postRouter.post(
  "/",
  authentication,
  createNewPost
);
postRouter.get("/search_1/", authentication, getPostByAuthor);
postRouter.get("/:id", authentication, getPostById);
postRouter.put("/:id", authentication, updatePost);
postRouter.delete("/:id", authentication, deletePostById);
postRouter.get("/authorPosts/:user_id", getAllPostsUser);
postRouter.get("/followers/:id", authentication, getAllPostsFollowers);

export default postRouter;
