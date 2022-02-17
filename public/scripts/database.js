const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

const getMenuItems = function() {
  return pool
    .query(`SELECT * FROM items`)
    .then((result)=> result.rows)
    .catch((err)=>{
      console.log(err.message);
    })
}

exports.getMenuItems = getMenuItems;

const getPhoneNumber = (user_id) => {
  return pool
    .query(`SELECT phone FROM users
     WHERE id = $1 `, [user_id])
    .then((result) => console.log(result.rows[0].phone))
    .catch((err) => {
      return (err.message);
    });
};
exports.getPhoneNumber = getPhoneNumber;

const createCartid = (user_id) => {
  return pool
    .query(`INSERT INTO carts(user_id, time_started) VALUES($1, CURRENT_TIMESTAMP)
     WHERE id = $1 `, [user_id])
    .then((result) => console.log(result.rows[0].phone))
    .catch((err) => {
      return (err.message);
    });
};
exports.createCartid = createCartid;
