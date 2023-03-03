const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
require('./passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoURL = process.env.MONGOURL;
const http = require("http")
const passport = require("passport")

const app = express();
const httpServer = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', './views');

app.use(
    session({
      store: MongoStore.create({
        mongoUrl: mongoURL,
        mongoOptions: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      }),
      secret: 'secreto',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 600000,
      },
    })
  );

app.use(passport.initialize());
app.use(passport.session());

module.exports = {app, httpServer}
