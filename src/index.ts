import express from "express";
import session from "express-session";
import mongo from "connect-mongo";
import mongoose from "mongoose";
import path from "path";

import * as homeController from "./controllers/home";
import * as wordController from "./controllers/word";

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

app.get("/", homeController.index);
app.get('/word/:emoji', wordController.index);

app.listen(app.get("port"), () => console.log(`Express listening!`));
