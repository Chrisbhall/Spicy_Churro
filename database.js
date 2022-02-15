const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});


const getUserWithEmail = function(email) {
  return pool
    .query(`SELECT name, email, id, password FROM users WHERE email=$1`,[email])
    .then((result)=> result.rows[0])
    .catch((err)=>{
      console.log(err.message);
    })
}
exports.getUserWithEmail = getUserWithEmail;
