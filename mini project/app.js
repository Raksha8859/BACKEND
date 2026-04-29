const express = require("express");
const mongoose = require("mongoose");
const auth = require("./middleware/authMiddleware");
require("dotenv").config();

const app = express();


app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));


app.use("/api/auth", require("./routes/authRoutes"));

app.get("/api/protected", auth, (req, res) => {
  res.json({
    msg: "Protected data accessed",
    user: req.user
  });
});
