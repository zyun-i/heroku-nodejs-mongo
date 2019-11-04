import mongoose from "mongoose";
import { Word } from "./models/Word";

const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost/your-app-name';

mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const ore = new Word({emoji: "tada", text: "hey hey hey."});

Word.findOne({ text: "hey hey hey." }, (err, existingWord) => {
  if (err) { console.log(err)  }
  if (existingWord) {
    console.log(existingWord);
  } else {
    ore.save(err);
  }
});
