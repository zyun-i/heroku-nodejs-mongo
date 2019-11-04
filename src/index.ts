import express from "express";
import mongoose from "mongoose";
import path from "path";

import * as homeController from "./controllers/home";

const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost/your-app-name';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set('view engine', 'pug');
app.get("/", homeController.index);

app.listen(app.get("port"), () => console.log(`Express listening!`));
