const mongoose = require("mongoose");

const secretSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
});

const Secret = mongoose.model("Secret", secretSchema);

module.exports = Secret;
