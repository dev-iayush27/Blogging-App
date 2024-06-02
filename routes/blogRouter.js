const express = require("express");
const Blog = require("../models/blogModel");
const multer = require("multer");
const path = require("path");

const blogRouter = express.Router();

blogRouter.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

blogRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  return res.render("blogDetails", {
    user: req.user,
    blog,
  });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

blogRouter.post("/", upload.single("coverImage"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const { title, body } = req.body;
  const blog = await Blog.create({
    title,
    body,
    coverImageURL: `/uploads/${req.file.filename}`,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${blog._id}`);
});

module.exports = blogRouter;
