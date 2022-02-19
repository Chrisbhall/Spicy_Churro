// load .env data into process.env
require("dotenv").config();
const database = require('./public/scripts/database');
// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
}));


// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));
//app.use("/menu",db);

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const menuRoutes = require('./routes/menus');
const cartRoutes = require('./routes/carts');
const sumRoutes = require('./routes/cartsum')

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/api/menus", menuRoutes(db));



// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/menu", (req, res) => {
  database.getMenuItems()
    .then(results => {
      res.render("menu", { results });
    });
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
/*app.get("/checkout", (req, res) => {


});*/
app.post("/login", (req, res) => {
  if (req.session.user_id) {
    req.session = null;
    res.redirect("/");
  }
  req.session.user_id = 1;
  res.redirect("/");
});

// redirect to login & destroy cookie session

app.post("/cart", (req, res) => {
  if (!req.session.cart_id) {
    database.createCartid()
      .then(results => {
        req.session.cart_id = results;
        app.use("/api/carts", cartRoutes(db, results));
        app.use("/api/cartsum", sumRoutes(db, results));
        console.log(req.session.cart_id);
        database.createCartsql(req.session.user_id, req.session.cart_id);
        database.createItemid()
          .then(results => {
            database.createItemsql(results, req.session.user_id, req.session.cart_id, req.body);
            res.redirect('/menu');
          });
      });
  } else {
    results = req.session.cart_id
    app.use("/api/carts", cartRoutes(db, results));
    app.use("/api/cartsum", sumRoutes(db, results));
    database.createItemid()
      .then(results => {
        database.createItemsql(results, req.session.user_id, req.session.cart_id, req.body);
        res.redirect('/menu');
      });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});



// SMS messaging Handling

const http = require('http');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

app.get('/checkout', (req, res) => {
  const sms = require('./public/scripts/send_sms');
  res.render("checkout");
});
app.post('/checkout', (req, res) => {
  const sms3 = require('./public/scripts/send_sms');
  res.render("checkout");
});
app.get('/complete', (req, res) => {
  const sms2 = require('./public/scripts/send_sms2');
 /* const twiml = new MessagingResponse();

  twiml.message(' Your order is ready for pickup!');

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());*/
  res.render("complete");
});

http.createServer(app).listen(3000, () => {
  console.log('Express server listening on port 3000');
});
