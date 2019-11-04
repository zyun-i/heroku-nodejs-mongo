import { Request, Response } from "express";
import { Word } from "../models/Word";

/**
 * GET /
 * Home page.
 */
export const index = async (req: Request, res: Response) => {
  Word.countDocuments({emoji: req.params.emoji}).then((count: any) => {
    const wordRndr = Math.floor(Math.random() * count);
    Word.find({emoji: req.params.emoji}).limit(1).skip(wordRndr).then(d =>{
      if(d.length) {
        res.render("home", {
          title: d[0].text
        });
      } else {
        res.render("home", {
          title: "not found"
        });
      }
    });
  });
};
