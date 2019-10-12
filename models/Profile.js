const mongoose = require("mongoose");

const Profile = mongoose.Schema({
  age: Number,
  gender: { type: String, enum: ["male", "female"] }
});

module.exports = mongoose.model("Profile", Profile);
