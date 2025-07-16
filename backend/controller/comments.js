import { pool } from "../models/db.js";

export const createNewCommentPost = (req, res) => {
  const post_id = req.params.id;
  const commenter = req.token.userId;
  const { comment } = req.body;

  const query = `INSERT INTO comment_posts (comment, commenter, post_id) VALUES ($1,$2,$3) RETURNING *`;
  const data = [comment, commenter, post_id];

  pool 
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Comment created successfully",
        result: result.rows[0],
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: "Server error",
        err,
      });
    });
};

export const getCommentByPostId = (req, res) => {
  const { id } = req.params;
  const query = `SELECT comment_posts.comment, comment_posts.created_at, comment_posts.post_id, users.firstName, users.photo, comment_posts.commenter,comment_posts.id, comment_posts.is_deleted
  FROM comment_posts
  JOIN users ON users.id = comment_posts.commenter
  WHERE comment_posts.post_id =$1 AND comment_posts.is_deleted = 0;`;
  const value = [id];
  pool
    .query(query, value)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `All comments for posts: ${id}`,
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err,
      });
    });
};

export const createNewCommentStory = (req, res) => {
  const story_id = req.params.id;
  const commenter = req.token.userId;
  const { comment } = req.body;

  const query = `INSERT INTO comment_story (comment, commenter, story_id) VALUES ($1,$2,$3) RETURNING *`;
  const data = [comment, commenter, story_id];

  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Comment created successfully",
        result: result.rows[0],
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: "Server error",
        err,
      });
    });
};

export const getCommentByStoryId = (req, res) => {
  const { id } = req.params;
  const query = `SELECT comment_story.comment, comment_story.story_id, users.firstName, comment_story.commenter
    FROM comment_story
    JOIN users ON users.id = comment_story.commenter
    WHERE comment_story.story_id =$1 AND comment_story.is_deleted = 0;`;
  const value = [id];
  pool
    .query(query, value)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `All comments for story: ${id}`,
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err,
      });
    });
};

export const createNewCommentReels = (req, res) => {
  const reel_id = req.params.id;
  const commenter = req.token.userId;
  const { comment } = req.body;

  const query = `INSERT INTO comment_reel (comment, commenter, reel_id) VALUES ($1,$2,$3) RETURNING *`;
  const data = [comment, commenter, reel_id];

  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Comment created successfully",
        result: result.rows[0],
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: "Server error",
        err,
      });
    });
};

export const getCommentByReelsId = (req, res) => {
  const { id } = req.params;
  const query = `SELECT comment_reel.comment, comment_reel.reel_id, users.firstName, comment_reel.commenter
    FROM comment_reel
    JOIN users ON users.id = comment_reel.commenter
    WHERE comment_reel.reel_id =$1 AND comment_reel.is_deleted = 0;`;
  const value = [id];
  pool
    .query(query, value)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `All comments for story: ${id}`,
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err,
      });
    });
};

export const updateCommentPostById = (req, res) => {
  const id = req.params.id;
  let { comment } = req.body;
  const commenter = req.token.userId;

  const query = `UPDATE comment_posts SET comment = COALESCE($1,comment) WHERE commenter=$2 AND id=$3 AND is_deleted = 0  RETURNING *;`;
  const values = [comment || null, commenter, id];
  pool
    .query(query, values)
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `comment with id: ${id} updated successfully `,
          result: result.rows[0],
        });
      } else {
        throw new Error("Error happened while updating comment");
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err,
      });
    });
};

export const updateCommentStoryById = (req, res) => {
  const id = req.params.id;
  let { comment } = req.body;
  const commenter = req.token.userId;

  const query = `UPDATE comment_story SET comment = COALESCE($1,comment) WHERE commenter=$2 AND id=$3 AND is_deleted = 0  RETURNING *;`;
  const values = [comment || null, commenter, id];
  pool
    .query(query, values)
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `comment with id: ${id} updated successfully `,
          result: result.rows[0],
        });
      } else {
        throw new Error("Error happened while updating comment");
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err,
      });
    });
};

export const updateCommentReelById = (req, res) => {
  const id = req.params.id;
  let { comment } = req.body;
  const commenter = req.token.userId;

  const query = `UPDATE comment_reel SET comment = COALESCE($1,comment) WHERE commenter=$2 AND id=$3 AND is_deleted = 0  RETURNING *;`;
  const values = [comment || null, commenter, id];
  pool
    .query(query, values)
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `comment with id: ${id} updated successfully `,
          result: result.rows[0],
        });
      } else {
        throw new Error("Error happened while updating comment");
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err,
      });
    });
};

export const deleteCommentPost = (req, res) => {
  const { id } = req.params;
  const query = `UPDATE comment_posts SET is_deleted=1 WHERE id=$1`;
  const value = [id];
  pool
    .query(query, value)
    .then((result) => {
      if (result.rowCount !== 0) {
        res.status(201).json({
          success: true,
          message: "comment delete successfully",
        });
      } else {
        throw new Error("Error happened while deleting comment");
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "server error",
      });
    });
};

export const deleteCommentStory = (req, res) => {
  const { id } = req.params;
  const query = `UPDATE comment_story SET is_deleted=1 WHERE id=$1`;
  const value = [id];
  pool
    .query(query, value)
    .then((result) => {
      if (result.rowCount !== 0) {
        res.status(201).json({
          success: true,
          message: "comment delete successfully",
        });
      } else {
        throw new Error("Error happened while deleting comment");
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "server error",
      });
    });
};

export const deleteCommentReels = (req, res) => {
  const { id } = req.params;
  const query = `UPDATE comment_reel SET is_deleted=1 WHERE id=$1`;
  const value = [id];
  pool
    .query(query, value)
    .then((result) => {
      if (result.rowCount !== 0) {
        res.status(201).json({
          success: true,
          message: "comment delete successfully",
        });
      } else {
        throw new Error("Error happened while deleting comment");
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "server error",
      });
    });
};
