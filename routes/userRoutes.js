const express = require("express");
const User = require("../models/userModels");

const userRouter = express.Router();

userRouter.get("/login", (req, res) => {
  return res.render("login");
});

userRouter.get("/signup", (req, res) => {
  return res.render("signup");
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.matchPassword(email, password);
  console.log("User", user);
  return res.redirect("/");
});

userRouter.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/");
});

module.exports = userRouter;
