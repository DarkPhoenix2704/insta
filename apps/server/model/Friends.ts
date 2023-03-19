import { Schema, model } from "mongoose";
const Friends = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: Number,
    enums: [
      0, // Request sent
      1, // Request Pending
      2, // Request accepted
    ],
  },
});

const FriendsModel = model("Friends", Friends);

export default FriendsModel;
