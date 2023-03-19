import { Request, Response } from "express";
import FriendsModel from "../../model/Friends";
import UserModel from "../../model/Users";

const updateFriend = async (req: Request, res: Response) => {
  const { friendId } = req.body;
  const { _id } = req.user;

  const friend = await FriendsModel.findOne({ friendId, userId: _id });
  try {
    if (!friend) {
      const temp1 = await FriendsModel.create({
        receiver: friendId,
        sender: _id,
        status: 0,
      });
      const temp2 = await FriendsModel.create({
        receiver: _id,
        sender: friendId,
        status: 1,
      });

      await UserModel.updateOne({ _id }, { $push: { friends: temp1._id } });
      await UserModel.updateOne(
        { _id: friendId },
        { $push: { friends: temp2._id } }
      );

      return res.json({
        success: true,
        message: "Friend request sent",
      });
    } else {
      const friend1 = await FriendsModel.findOne({
        sender: _id,
        receiver: friendId,
      });
      const friend2 = await FriendsModel.findOne({
        sender: friendId,
        receiver: _id,
      });
      await UserModel.updateOne(
        { _id: friendId },
        { $pull: { friends: friend2!._id } }
      );
      await UserModel.updateOne({ _id }, { $pull: { friends: friend1!._id } });
      friend2?.deleteOne();
      friend1?.deleteOne();
      return res.json({
        success: true,
        message: "Friend request deleted",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export default updateFriend;
