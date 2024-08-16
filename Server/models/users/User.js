const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  hasCreatedAccount: {
    type: Boolean,
    default: false
  },
  accounts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account"
    },
  ],
}, {
  timestamps: true,
  toJSON: {virtual: true}
});

//model
const User = mongoose.model("User", userSchema);
module.exports = User;