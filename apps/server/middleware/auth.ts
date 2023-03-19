import { Request, Response, NextFunction } from "express";

const authenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(200).json({ message: "Unauthorized", success: true });
};

export default authenticated;
