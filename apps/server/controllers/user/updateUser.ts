import { Request, Response } from "express";
import UserModel from "../../model/Users";
import exclude from "../../utils/exclude";
const updateUser = async (req: Request, res: Response) => {
  const {
    user: { email },
  } = req;
  const { name, bio, gender } = req.body;
  const temp = await UserModel.findOne({ email });
  if (!temp) {
    return res.json({
      success: false,
      message: "User not found",
    });
  }
  const data = await UserModel.findOneAndUpdate(
    { email },
    {
      name,
      bio,
      gender,
    }
  );

  if (!data) {
    return res.json({
      success: false,
      message: "User not updated",
    });
  }
  const updateUser = await UserModel.findOne({ email });
  return res.json({
    success: true,
    data: updateUser,
    message: "User updated",
  });
};

export default updateUser;
