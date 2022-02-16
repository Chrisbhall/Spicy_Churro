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
