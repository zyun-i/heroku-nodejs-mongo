import express from "express";
import session from "express-session";
import flash from "express-flash";
import mongo from "connect-mongo";
import mongoose from "mongoose";
import path from "path";
import passport from "passport";

import * as homeController from "./controllers/home";
import * as wordController from "./controllers/word";
import * as userController from "./controllers/user";

const SESSION_SECRET = "abc";
const MongoStore = mongo(session);

const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost/your-app-name';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set('view engine', 'pug');
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  store: new MongoStore({
    url: mongoUrl,
    autoReconnect: true
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
app.use(flash());

app.get("/", homeController.index);
app.get('/word/:emoji', wordController.index);
app.get("/login", userController.getLogin);
app.post("/login", userController.postLogin);

/**
 *  * OAuth authentication routes. (Sign in)
 */
app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.listen(app.get("port"), () => console.log(`Express listening!`));
