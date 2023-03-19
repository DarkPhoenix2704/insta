import { Request, Response } from "express";
import UserModel from "../../model/Users";

const user = async (req: Request, res: Response) => {
  const {
    user: { email },
  } = req;
  const user = await UserModel.findOne({ email });
  res.json({
    success: true,
    data: user,
    message: "User found",
  });
};

export default user;
