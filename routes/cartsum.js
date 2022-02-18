/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db, results) => {
  router.get("/", (req, res) => {
    db.query(`SELECT SUM(items.price_cents), COUNT(items)
    FROM items
    JOIN cart_and_ordered_items ON items.id = item_id
    WHERE cart_id = $1
    GROUP BY cart_id;`, [results])
      .then((result) => {
        sum = result.rows
        res.json({sum})
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
}
