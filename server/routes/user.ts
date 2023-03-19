import { Router } from "express";
import { accept, friends, getFriends, updateFriend } from "../controllers/friend";
import { getUser, search, updateUser, user } from "../controllers/user";
import authenticated from "../middleware/auth";
const userRouter = Router();

userRouter.get("/", authenticated, user);
userRouter.get("/friend", authenticated, friends);
userRouter.get("/:slug", getUser);
userRouter.get("/search", search);
userRouter.post("/", authenticated, updateUser);
userRouter.post("/friend", authenticated, updateFriend);
userRouter.get("/:slug/friend", getFriends);
userRouter.post("/friend/accept", authenticated, accept);

export default userRouter;
