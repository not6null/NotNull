import { pool } from "../models/db.js";

export const createNewReels = (req, res) => {
  const { video } = req.body;
  const user_id = req.token.userId;
  const query = `INSERT INTO reels (video, user_id) VALUES ($1, $2) RETURNING *`;
  const value = [video, user_id];
  pool
    .query(query, value)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "reel created successfully",
        result: result.rows[0]
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err
      });
    });
};

export const getAllReels = (req, res) => {
  const query = `SELECT * FROM reels WHERE is_deleted = 0`;
  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All the reels",
        reels: result.rows
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err
      });
    });
};

export const deletedReels = (req, res) => {
  const { id } = req.params;
  const query = `UPDATE reels SET is_deleted=1 WHERE id=$1;`;
  const data = [id];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rowCount !== 0) {
        res.status(200).json({
          success: true,
          message: `reels with id: ${id} deleted successfully`
        });
      } else {
        throw new Error("Error happened while deleting reels");
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err
      });
    });
};
