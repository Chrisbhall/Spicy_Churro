/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/menu", (req, res) => {
    db.query(`SELECT * FROM items;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};


const getUserWithEmail = function(email) {
  return pool
    .query(`SELECT name, email, id, password FROM users WHERE email=$1`,[email])
    .then((result)=> result.rows[0])
    .catch((err)=>{
      console.log(err.message);
    })
}
exports.getUserWithEmail = getUserWithEmail;
