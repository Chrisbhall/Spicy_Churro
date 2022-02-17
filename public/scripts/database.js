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
    .then((result) => result.rows[0].phone)
    .catch((err) => {
      return (err.message);
    });
};
exports.getPhoneNumber = getPhoneNumber;

const createCartid = () => {
  return pool
    .query(`SELECT COUNT(*) FROM carts `)
    .then((result) => Number(result.rows[0].count) + 1)
    .catch((err) => {
      return (err.message);
    });
};
exports.createCartid = createCartid;

// const createCartsql = (user_id, cart_id) => {
//   return pool
//     .query(`INSERT INTO carts(cart_id, user_id, time_started) VALUES($2, $1, CURRENT_TIMESTAMP) RETURNING *;`, [user_id, cart_id])
//     .then((result) => console.log(result.rows))
//     .catch((err) => {
//       return (err.message);
//     });
// };
// exports.createCartsql = createCartsql;


const createCartsql = (user_id, cart_id) => {
  pool.query(
    `INSERT INTO carts(id, user_id, time_started) VALUES($2, $1, CURRENT_TIMESTAMP) RETURNING *;`, [user_id, cart_id],
    (err, res) => {
      console.log(err, res.rows);
      pool.end();
    }
  );
}
exports.createCartsql = createCartsql;

// createCartid()
//   .then(res => createCartsql(10, res));
// const addProperty = (propertyObj) => {
//   return pool
//     .query(`
//     INSERT INTO properties(owner_id,
//       title,
//       description,
//       thumbnail_photo_url,
//       cover_photo_url,
//       cost_per_night,
//       street,
//       city,
//       province,
//       post_code,
//       country,
//       parking_spaces,
//       number_of_bathrooms,
//       number_of_bedrooms)
//     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
//     RETURNING *;
//     `, [propertyObj.owner_id, propertyObj.title, propertyObj.description, propertyObj.thumbnail_photo_url, propertyObj.cover_photo_url, propertyObj.cost_per_night, propertyObj.street, propertyObj.city, propertyObj.province, propertyObj.post_code, propertyObj.country, propertyObj.parking_spaces, propertyObj.number_of_bathrooms, propertyObj.number_of_bedrooms])
//     .then((result) => result.rows[0])
//     .catch((err) => {
//       return (err.message);
//     });
// };
