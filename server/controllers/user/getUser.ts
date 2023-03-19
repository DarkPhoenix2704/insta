import { Request, Response } from "express";
import UserModel from "../../model/Users";
import exclude from "../../utils/exclude";

const getUser = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const temp = await UserModel.findOne({ slug });
  if (temp) {
    const user = exclude(temp, ["password"]);
    res.json({
      success: true,
      data: user,
      message: "User found",
    });
  } else {
    res.json({
      success: false,
      message: "User not found",
    });
  }
};

export default getUser;
