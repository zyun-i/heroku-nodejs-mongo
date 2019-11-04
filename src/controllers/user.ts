import { Request, Response, NextFunction } from "express";
import { check, sanitize, validationResult } from "express-validator";
import passport from "passport";
import { User, UserDocument, AuthToken } from "../models/User";
import { IVerifyOptions } from "passport-local";
import "../config/passport";

/**
 * GET /login
 * Login page.
 */
export const getLogin = (req: Request, res: Response) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("account/login", {
    title: "Login"
  });
};

/**
 * POST /login
 * Sign in using email and password.
 */
export const postLogin = async (req: Request, res: Response, next: NextFunction) => {
  await check("email", "Email is not valid").isEmail().run(req);
  await check("password", "Password cannot be blank").isLength({min: 1}).run(req);
  // eslint-disable-next-line @typescript-eslint/camelcase
  await sanitize("email").normalizeEmail({ gmail_remove_dots: false }).run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.flash("errors", errors.array());
    return res.redirect("/login");
  }

  passport.authenticate("local", (err: Error, user: UserDocument, info: IVerifyOptions) => {
    if (err) { return next(err); }
    if (!user) {
      req.flash("errors", {msg: info.message});
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect("/");
    });
  })(req, res, next);
};
