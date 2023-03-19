import { Request, Response } from "express";
import FriendsModel from "../../model/Friends";
import UserModel from "../../model/Users";

const friends = async (req: Request, res: Response) => {
  const { _id } = req.user;
  console.log(_id);
  const y = await UserModel.findById(_id, {
    friends: 1,
  });

  await y?.friends.forEach(async (friend) => {
    const k = await FriendsModel.findById(friend, {
      sender: 1,
      receiver: 1,
    })
      .populate("sender")
      .populate("receiver")
      .exec();
    console.log(k);
    if (k?.status === 2) {
      console.log(k);
    }
  });

  const friends = await FriendsModel.find({
    $or: [{ sender: _id }, { receiver: _id }],
  })
    .populate("sender")
    .populate("receiver");
  console.log(friends);
  return res.json({
    success: true,
    friends,
  });
};

export default friends;
