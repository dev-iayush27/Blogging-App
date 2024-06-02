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
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("login", {
      error: "Incorrect email or password.",
    });
  }
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

userRouter.get("/logout", (req, res) => {
  return res.clearCookie("token").redirect("/");
});

module.exports = userRouter;
