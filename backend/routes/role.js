import express from "express";
import {
  createNewRole,
  createNewPermission,
  createNewRolePermission,
} from "../controller/role.js";

const rolesRouter = express.Router();

// controllers
rolesRouter.post("/", createNewRole);
rolesRouter.post("/permission", createNewPermission);
rolesRouter.post("/role_permission", createNewRolePermission);

export default rolesRouter;
