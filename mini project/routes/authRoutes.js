const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();


router.post("register", async (req,res) => {
    const { email,password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
        return res.json({ msg: "User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        email,
        password: hashedPassword
    });

      res.json({ msg: "Registered successfully" });
});



router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ msg: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.json({ msg: "Wrong password" });
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET
  );

  res.json({
    msg: "Login successful",
    token
  });
});

module.exports = router;
