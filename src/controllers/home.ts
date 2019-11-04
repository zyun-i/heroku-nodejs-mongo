import { Request, Response } from "express";
import { Word } from "../models/Word";

/**
 * GET /
 * Home page.
 */
export const index = async (req: Request, res: Response) => {
  Word.countDocuments({emoji: 'tada'}).then((count: any) => {
    const wordRndr = Math.floor(Math.random() * count);
    Word.find({emoji: "tada"}).limit(1).skip(wordRndr).then(d =>{
      res.render("home", {
        title: d[0].text
      });
    });
  });
};
