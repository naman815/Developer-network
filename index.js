const express = require("express");

const port = process.env.PORT || 8000;
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

// db congig
const db = require("./config/keys").mongoURI;

mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

app.listen(port, () => console.log(`sever running on port ${port}`));
