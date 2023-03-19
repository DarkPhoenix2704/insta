import express, { Express, json, Request, Response } from "express";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import * as mongoose from "mongoose";
import cors from "cors";
import passport from "passport";
import LocalStrategy from "passport-local";
import authRouter from "./routes/auth";
import UserModel from "./model/Users";
import { compare } from "bcryptjs";
import userRouter from "./routes/user";

dotenv.config();
const port = process.env.PORT;

// Connect to MongoDB
const mongoPromise = mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("Connected to MongoDB ⚡️");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });
mongoose.set("strictQuery", true);

const app: Express = express();

// Express middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL as string,
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(json({}));

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI as string,
      ttl: 60 * 60 * 24,
      autoRemove: "native",
      dbName: "test",
    }),
  })
);

// Passport local strategy
passport.use(
  new LocalStrategy.Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email: string, password: string, done: any) => {
      try {
        const user = await UserModel.findOne({ email });
        if (!user) {
          return done(null, false, "User not found");
        }
        const valid = await compare(password, user.password);
        if (!valid) {
          return done(null, false, "Incorrect password");
        }
        return done(null, user, "Logged in successfully");
      } catch (err) {
        return done(err, false, "Something went wrong");
      }
    }
  )
);
passport.serializeUser((user: any, done: any) => {
  done(null, user);
});

passport.deserializeUser((user: any, done: any) => {
  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
