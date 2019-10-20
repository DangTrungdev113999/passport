const express = require('express');
const passport = require("passport");
const session = require("express-session");
const mongoose = require('mongoose');
const path = require("path");
const initRouter = require("./routers/web");

const app = express();
const port = 3000;
mongoose.connect('mongodb://localhost/trung-doan', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(session({
  secret: 'keyboardcat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000*60*60*24 }
}))

app.use(express.static("./public"));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', initRouter);

app.listen(port, () => console.log(`Example app listening on port port!`));

