import express from "express";
import {
  createFollower,
  deleteFollower,
  getFollowersUser,
  userFollower,
  getAllFollowers
} from "../controller/follower.js";
import { authentication } from "../middleware/Authentication.js";

const followerRouter = express.Router();

followerRouter.post("/:id", authentication, createFollower);
followerRouter.delete("/:id", authentication, deleteFollower);
followerRouter.get("/userFollowers/:id", authentication, getFollowersUser);
followerRouter.get("/", authentication, userFollower);
followerRouter.get("/all", authentication, getAllFollowers);

export default followerRouter;
