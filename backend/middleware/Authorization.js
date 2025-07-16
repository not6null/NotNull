import { pool } from "../models/db.js";

const authorization = (permission) => {
  return function (req, res, next) {
    const role_id = req.token.role;
    const data = [role_id, permission];
    const query = `
      SELECT * FROM role_permission
      INNER JOIN permissions ON role_permission.permission_id = permissions.id
      WHERE role_permission.role_id = $1 AND permissions.permission = $2
    `;
    pool
      .query(query, data)
      .then((result) => {
        if (result.rows.length) {
          next();
        } else {
          res.status(403).json({ message: "unauthorized" });
        }
      })
      .catch(() => {
        res.status(400).json({ message: "unauthorized" });
      });
  };
};

export default authorization;
