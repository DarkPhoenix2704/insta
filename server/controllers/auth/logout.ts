import { Request, Response } from "express";

const logout = async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ message: "Error logging out", success: false });
    }
    return res.json({ message: "Logged out", success: true });
  });
};

export default logout;
