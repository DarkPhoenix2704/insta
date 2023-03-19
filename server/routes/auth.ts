import { Request, Router, Response } from "express";
import passport from "passport";
import { logout, signup } from "../controllers/auth";
import authenticated from "../middleware/auth";

const authRouter = Router();

authRouter.post("/logout", authenticated, logout);
authRouter.post("/signup", signup);
authRouter.post("/login", (req: Request, res: Response, next: any) => {
  passport.authenticate(
    "local",
    { session: true },
    (err: Error, user: any, info: string) => {
      if (err) {
        res.json({
          success: false,
          message: info,
        });
      } else {
        res.json({
          success: true,
          data: user,
          message: info,
        });
      }
    }
  )(req, res, next);
});

export default authRouter;
