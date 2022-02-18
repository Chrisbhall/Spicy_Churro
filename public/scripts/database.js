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

const createCartsql = (user_id, cart_id) => {
  a = `$2, $1`
  pool.query(
    `INSERT INTO carts(id, user_id, time_started) VALUES(${a}, CURRENT_TIMESTAMP) RETURNING *;`, [user_id, cart_id],
    (err, res) => {
      console.log(err, res.rows);
    }
  );
}
exports.createCartsql = createCartsql;

const createItemid = () => {
  return pool
    .query(`SELECT COUNT(*) FROM cart_and_ordered_items`)
    .then((result) => Number(result.rows[0].count) + 1)
    .catch((err) => {
      return (err.message);
    });
};
exports.createItemid = createItemid;

const createItemsql = (id, user_id, cart_id, obj) => {
  let a = []
  let b = ''
  let c = ''
  for (let elements in obj) {
    a.push(elements)
    a.push(obj[elements])
  }
  for (let i = 4; i < a.length; i++) {
    if (i%2 === 0) {
      b += `, ${a[i]}`
    }
    else {
      c += `, ${a[i]}`
    }
  }
  console.log(b)
  console.log(c);
  pool.query(
    `INSERT INTO cart_and_ordered_items(id, user_id, cart_id, item_id, size${b}) VALUES(${id}, ${user_id}, ${cart_id}, ${obj.item_id},'${obj.size}'${c});`,
    (err, res) => {
      console.log(err, res.rows);
    }
  );
}

exports.createItemsql = createItemsql;


const getItemNameAndPrice = (obj) => {
  return pool
    .query(`SELECT name, price_cents FROM items
     WHERE id = $1 `, [obj.item_id])
    .then((result) => [result.rows[0].name,result.rows[0].price_cents/100])
    .catch((err) => {
      return (err.message);
    });
};
exports.getItemNameAndPrice = getItemNameAndPrice;

getItemNameAndPrice(
  {
    item_id: '2',
    size: 'Medium',
    spice_level: '3',
    lettuce: 'TRUE',
    beans: 'TRUE',
    cheese: 'TRUE',
    cilantro: 'TRUE',
    noodles: 'TRUE'
  }
)


exports.appendCartElement = getItemNameAndPrice;

// const loadTweets = function(url) {
//   $.get(url).then((data) => {
//     renderTweets(data);
// })
// }


// const createTweetElement = (tweetData) => {
//   const layout = `
//     <article class="tweets" id="boxShadow">
//       <header class="oppositeSide ">
//         <div class="picName">
//           <div class="imageBox" >
//             <img src="${tweetData.user.avatars}" alt="Random Man Face">
//           </div>
//           <div >
//             <p style = "margin-left: 10px;">${tweetData.user.name}</p>
//           </div>
//         </div>
//         <div class="handle">
//           <p>${tweetData.user.handle}</p>
//         </div>

//       </header>
//       <p class="tweetContainer">
//       ${(htmlEncode(tweetData.content.text))}
//       </p>
//       <footer class = "oppositeSide small">
//         <span> ${timeago.format(Number(tweetData.created_at))}</span>
//         <div class = "horizontal">
//           <i class="fa-solid fa-flag icon1"></i>
//           <i class="fa-solid fa-retweet icon2"></i>
//           <i class="fa-solid fa-heart icon3"></i>
//         </div>
//       </footer>
//     </article>
//   `
//   return layout
// }
// const $form = $('#menuForm');
// $form.on('submit', function (e) {
//   console.log('form submitted!');
//   let formValues = $(this).serialize();
//   $.post("/carts2", formValues,() => {
//     console.log('ajax post request went through');
//     // loadRecentTweet("/tweets/")
//     // document.getElementById('counter').innerHTML = '140';
//   });
//   // make textbox empty again
//   $form[0].reset();

// })
// //generate each item in the array
// const renderItems = function(items) {

//   for (let i = 0; i < items.length; i++) {
//     //console.log(items[i]);
//     const $item = createMenuElement(items[i]);
//     $('section.items').append($item);
//   }
// };


// createCartid()
//   .then(results => createCartsql(1, results))
