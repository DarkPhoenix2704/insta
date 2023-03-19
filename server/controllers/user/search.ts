import { Request, Response } from "express";
import UserModel from "../../model/Users";

const search = async (req: Request, res: Response) => {
  const { search, limit } = req.query;
  const users = await UserModel.find({
    name: { $regex: search },
  }).limit(parseInt(limit as string));
  const data = users.map((user) => {
    return {
      name: user.name,
      slug: user.slug,
    };
  });
  res.json({
    data,
    success: true,
  });
};

export default search;
