import express from "express";
import {
  getAllStories,
  createNewStory,
  deleteStoryById,
  getStoryByAuthor
} from "../controller/story.js";
import { authentication } from "../middleware/Authentication.js";

const storyRouter = express.Router();

storyRouter.post("/", authentication, createNewStory);
storyRouter.get("/", getAllStories);
storyRouter.delete("/:id", deleteStoryById);
storyRouter.get("/auth", authentication, getStoryByAuthor);

storyRouter.use("*", (req, res) => {
  res.json("storyRouter is working");
});

export default storyRouter;
