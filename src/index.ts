import mongoose from "mongoose";

const mongoUrl = 'mongodb://localhost/test';

mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const kittySchema = new mongoose.Schema({
  name: String
});

const Kitten = mongoose.model('Kitten', kittySchema);
const fluffy = new Kitten({ name: 'fluffy' });

fluffy.save(function (err, fluffy) {
  if (err) return console.error(err);
});

Kitten.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens);
});
