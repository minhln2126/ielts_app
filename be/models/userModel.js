const mongoose = require("mongoose");
const joi = require("joi");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      select: false,
      default: "",
    },
    role: {
      type: String,
      enum: ["admin", "partner", "guest"],
      default: "guest",
    },
    googleID: {
      type: String,
      default: "",
    },
    resetPass: {
      type: String,
      default: "",
    },
    badge: {
      type: String,
      default: "pawn",
    },
    score: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  //check password is modified or not
  if (!this.isModified("password")) {
    console.log("line 32 userModel password is not modified");
    return next();
  }

  //hashing password
  let salt = process.env.SALT_SECRET;
  this.password = await (
    await bcrypt.hash(this.password, salt)
  ).slice(salt.length);
  //remove salt from hashed password
  next();
});

userSchema.methods.comparePassword = async function (
  typedPassword,
  originalPassword
) {
  return await bcrypt.compare(
    typedPassword,
    process.env.SALT_SECRET.concat(originalPassword)
  );
};

const validate = (user) => {
  const schema = joi.object({
    name: joi.string().min(2).max(50).required(),
    email: joi.string().email().min(8).max(255).required(),
    password: joi.string().min(4).required(),
    role: joi.string(),
  });
  return schema.validate(user);
};

const User = mongoose.model("user", userSchema);
module.exports = {
  User,
  validate,
};
