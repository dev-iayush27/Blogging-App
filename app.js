const express = require("express");
const path = require("path");
const userRouter = require("./routes/userRouter");
const { connectToMongoDb } = require("./dbConnection");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/auth");
const blogRouter = require("./routes/blogRouter");
const Blog = require("./models/blogModel");
const dotenv = require("dotenv");

// Setting up config file
dotenv.config({ path: "config.env" });

const app = express();
const PORT = process.env.PORT;

connectToMongoDb();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
  const allBlog = await Blog.find({}).sort({ createdAt: -1 });
  res.render("home", {
    user: req.user,
    blogs: allBlog,
  });
});

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.listen(PORT, () => console.log("Server started at port: ", PORT));
