import { hash } from "bcryptjs";
import { Request, Response } from "express";
import UserModel from "../../model/Users";

const signup = async (req: Request, res: Response) => {
  const { email, password, slug, name } = req.body;
  const hashPassword = await hash(password, 10);
  const user = new UserModel({ email, password: hashPassword, slug, name });
  await user.save();
  return res.json({ message: "User created", success: true, user });
};

export default signup;
