const mongoose = require("mongoose");
const User = require("../models/User");
const Profile = require("../models/Profile");
const { createToken } = require("../helpers/jwt");

class AuthController {
  async register(req, res, next) {
    try {
      const { email, password, age, gender } = req.body;

      if (await User.findOne({ email })) {
        return res.status(400).json({ message: "User already exists" });
      }

      const profile = new Profile({
        _id: mongoose.Types.ObjectId(),
        age,
        gender
      });
      await profile.save();

      console.log(req.body);

      const user = new User({ email, password, profile: profile._id });
      await user.save();

      const newUser = await User.findOne({ email });
      res.json({ user: newUser.getCleanUser() });
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).populate("profile");
      console.log(user);

      if (!user) {
        return res.status(404).json({ message: "Invalid credentials." });
      }

      if (!(await user.comparePassword(password))) {
        return res.status(400).json({ message: "Invalid credentials." });
      }

      const token = createToken(user);
      res.status(201).json({ token, user: user.getCleanUser() });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
