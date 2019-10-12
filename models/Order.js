const mongoose = require("mongoose");

const Order = mongoose.Schema({
  title: String
});

module.exports = mongoose.model("Order", Order);
