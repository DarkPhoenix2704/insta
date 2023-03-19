import { Request, Response } from "express";
import FriendsModel from "../../model/Friends";

const accept = async (req: Request, res: Response) => {
  const { friendId } = req.body;
  const { _id } = req.user;

  try {
    const friend1 = await FriendsModel.findOne({
      sender: _id,
      receiver: friendId,
    });
    const friend2 = await FriendsModel.findOne({
      sender: friendId,
      receiver: _id,
    });

    if (friend1?.status === 0 && friend2?.status === 1) {
      friend1.status = 2;
      friend2.status = 2;
      await friend1.save();
      await friend2.save();
      return res.json({
        success: true,
        message: "Friend request accepted",
      });
    } else {
      return res.json({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {}
};

export default accept;
