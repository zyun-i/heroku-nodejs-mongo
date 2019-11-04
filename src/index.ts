import express from "express";
import mongoose from "mongoose";
import { Word } from "./models/Word";

const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost/your-app-name';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const wordList = [
  "狭き門より入れ。",
  "人はパンのみにて生くるにあらず。",
  "剣を取る者は、剣で滅びる。",
  "明日のことを思いわずらうな。明日のことは、明日自身が思いわずらうであろう。",
  "求めよ、そうすれば、与えられるであろう。",
];

wordList.forEach(word => {
  const tada = new Word({emoji: "tada", text: word});
  Word.findOne({ text: word}, (err, existingWord) => {
    if (err) { console.log(err)  }
    if (!existingWord) {
      tada.save(err);
    }
  });
});

const PORT = process.env.PORT || 3000;
const app = express();
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

Word.countDocuments({emoji: 'tada'}).then((count: any) => {
  const wordRndr = Math.floor(Math.random() * count);
  Word.find({emoji: "tada"}).limit(1).skip(wordRndr).then(d =>{
    console.log(d);
  });
});
