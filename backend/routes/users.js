import express from "express";
import {
  register,
  login,
  getUserById,
  updateData,
  search,
  getAllUsers,
} from "../controller/users.js";
import { authentication } from "../middleware/Authentication.js";

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.get("/all", getAllUsers); 
userRouter.get("/:id", getUserById);
userRouter.get("/", search);
userRouter.put("/:id", authentication, updateData);
userRouter.get("*", (req, res) => {
  res.send("working");
});

export default userRouter;
