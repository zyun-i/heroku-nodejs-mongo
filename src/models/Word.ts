import * as mongoose from "mongoose";

export type WordDocument = mongoose.Document & {
  emoji: string;
  text: string;
};

const wordSchema = new mongoose.Schema({
  emoji: String,
  text: String,
});

export const Word = mongoose.model<WordDocument>("Word", wordSchema);
