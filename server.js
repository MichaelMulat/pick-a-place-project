const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const passport = require("./databases/passport");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

const mongoose = require("mongoose");
const routes = require("./databases/routes")

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/pickaplace_db",
  {
    useNewUrlParser: true,
    useCreateIndex: true
  }
);
var store = new MongoDBStore({
  uri: "mongodb://localhost/pickaplace_db",
  collection: "mySessions"
});

app.use(
  session({
    secret: "ride or die",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 1 week
    },
    store: store,
    resave: true,
    saveUninitialized: true
  })
);


app.use(passport.initialize());
app.use(passport.session());


// Add routes, both API and view
app.use(routes);

store.on('error', function (error) {
  console.log(error);
});



app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
