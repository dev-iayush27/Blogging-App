const mongoose = require("mongoose");

// DB connection
async function connectToMongoDb() {
  return mongoose
    .connect("mongodb://localhost:27017/blogger")
    .then((con) =>
      console.log(
        `MongoDB Database connected with HOST: ${con.connection.host}`
      )
    )
    .catch((err) => console.log("Error: ", err));
}

module.exports = { connectToMongoDb };
