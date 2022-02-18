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
    db.query(`SELECT name, price_cents FROM items JOIN cart_and_ordered_items ON item_id= items.id WHERE cart_id = $1 `, [results])
      .then((result) => {
        carts = result.rows
        res.json({carts})
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
}
