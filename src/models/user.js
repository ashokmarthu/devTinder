const mongoose = require("mongoose");
const validator = require("validator");
const { Schema, model } = mongoose;
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 4,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      min: 4,
      max: 20,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a Strong Password: " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    about: {
      type: String,
      default: "This is about me...",
    },
    skills: {
      type: [String],
    },
    photoUrl: {
      type: String,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo URL" + value);
        }
      },
      default:
        "https://www.rattanhospital.in/wp-content/uploads/2020/03/user-dummy-pic.png",
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender Data is not valid");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
