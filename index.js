const express = require("express");
const cookieParser = require("cookie-parser");
const port = 8000;
const app = express();
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
//Used for session cookie
const session = require("express-session");
const passport = require("passport");
const passoprtLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo");
const mongoStore = require("connect-mongo");
const sassMiddleware = require('node-sass-middleware');


app.use(sassMiddleware({
  src: './assets/scss',
  dest:'./assets/css',
  debug: true,
  outputStyle: 'extended',
  prefix: '/css'
}))


app.use(express.urlencoded());
app.use(cookieParser());
//setting up layouts
app.use(expressLayouts);
//Setting static file
app.use(express.static("./assets"));
//Extract style and script from subpages into layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//Setting view Engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    name: "codial",
    secret: "blahsometing",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: (1000 * 60 * 100),
    },
    store: mongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/codial_dev",
      mongooseConnection: db,
      collectionName: "session",
      autoRemove: "disabled",
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// Setting routers
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`error in starting the server : ${err}`);
  }
  console.log(`Server is running on : ${port}`);
});
