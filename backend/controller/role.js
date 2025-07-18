import { pool } from "../models/db.js";

export const createNewPermission = (req, res) => {
  const { permission } = req.body;
  // Table name should be 'permissions' (plural) to match your schema
  const query = `INSERT INTO permissions (permission) VALUES ($1) RETURNING *;`;
  const data = [permission];

  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Permission created successfully`,
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server error`,
        err: err,
      });
    });
};

export const createNewRole = (req, res) => {
  const { role } = req.body;

  const query = `INSERT INTO roles (role) VALUES ($1) RETURNING *`;
  const data = [role];
  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Role created successfully",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server error`,
        err: err,
      });
    });
};

export const createNewRolePermission = (req, res) => {
  const { role_id, permission_id } = req.body;
  const query = `INSERT INTO role_permission (role_id, permission_id) VALUES ($1, $2) RETURNING *`;
  const data = [role_id, permission_id];

  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Role Permission created successfully`,
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server error`,
        err: err,
      });
    });
};

