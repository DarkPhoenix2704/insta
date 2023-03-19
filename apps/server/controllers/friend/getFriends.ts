import { Request, Response } from "express";
import FriendsModel from "../../model/Friends";
import UserModel from "../../model/Users";

const getFriends = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const user = await UserModel.findOne({ slug });
    const finalData: Array<{
      slug: string;
      name: string;
    }> = [];
    await user!.friends.forEach(async (user) => {
      const friends = await FriendsModel.findOne({ _id: user._id });
      if (friends && friends.status === 2) {
        const temp = await UserModel.findOne({ _id: friends.sender });
        const temp1 = await UserModel.findOne({ _id: friends.receiver });
        finalData.push({
          slug: temp1!.slug,
          name: temp1!.name,
        });
        finalData.push({
          slug: temp!.slug,
          name: temp!.name,
        });
      }
    });
    const finalData1: Array<{ slug: string; name: string }> = (
      await Promise.resolve(finalData)
    ).filter((da) => da.slug !== slug);
    const finalSet = new Set(finalData1);
    res.status(200).json({
      data: await Promise.resolve(Array.from(finalSet)),
      message: "success",
      success: true,
    });
  } catch (error) {
    res.status(200).json({
      data: null,
      message: "Internal server error",
      success: false,
    });
  }
};

export default getFriends;
