import { Schema, model } from "mongoose";

const User = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  bio: {
    type: String,
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "Friends",
    },
  ],
});

const UserModel = model("User", User);

export default UserModel;
