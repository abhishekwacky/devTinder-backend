const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 20,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 18,
    max: 60,
  },
  gender: {
    type: String,
    //custom validation
    validate(value) {
      if (!["male", "female", "others"].includes(value)) {
        throw new Error("gender data is not valid");
      }
    },
  },
  //By deaful validate function do not run on updating existing data you have to enable it through options
  photoUrl: {
    type: String,
    default: "https://www.freepik.com/free-photos-vectors/user-profile",
  },
  about: {
    type: String,
    default: "This is default option of this user",
  },
  skills: {
    type: [String],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
