const express = require("express");
const path = require("path");
const userRouter = require("./routes/userRoutes");
const { connectToMongoDb } = require("./dbConnection");

const app = express();
const PORT = 9000;

connectToMongoDb();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/user", userRouter);

app.listen(PORT, () => console.log("Server started at port: ", PORT));
