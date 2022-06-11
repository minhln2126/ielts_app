// promisify help to convert callback base to promise base
// with that u can use await
const { promisify } = require("util");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { User } = require("../models/userModel");
const base = require("./baseController");
const c = require("../constants");

const { sendEmail } = require("../services/mailServices");

const createToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

exports.signup = async (req, res, next) => {
  console.log("Signup request data: ", req.body);
  const doc = await User.findOne({ email: req.body.email });
  if (doc) {
    res.status(400).json({
      status: "fail",
      message: "This email is already taken!",
    });
  } else {
    try {
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.googleID ? "" : req.body.password,
        googleID: req.body.googleID,
        role: req.body.role,
      });
      const token = createToken(_.pick(user, ["_id", "role"]));

      //remove password before send response to client
      user.password = undefined;

      res.status(201).json({
        status: "success",
        token,
        user,
      });
    } catch (err) {
      res.status(400).send("Error");
      console.log("userController line 43 fail to create new user");
      console.log(err.keyValue);
      next(err);
    }
  }
};

exports.login = async (req, res, next) => {
  if (req.body.googleID) {
    const user = await User.findOne({ googleID: req.body.googleID });
    if (!user) this.signup(req, res, next);
    else {
      user.password = undefined;

      const token = createToken(_.pick(user, ["_id", "role"]));

      res.status(200).json({
        status: "success",
        token,
        data: user,
      });
    }
  } else {
    try {
      console.log(req.body);

      const { email, password } = req.body;

      //1 check if email and password exits
      if (!email || !password) {
        res.status(404).json({
          message: "Email and password are required!",
        });
        return;
      }

      //2 check if user exist and password is correct
      const user = await User.findOne({
        email,
      }).select("+password");

      if (!user || !(await user.comparePassword(password, user.password))) {
        res.status(401).json({
          message: "email or password is incorrect!",
        });
        return;
      }

      //remove password before sending it to client
      user.password = undefined;
      user.googleID = undefined;

      //3 all correct send jwt to the client
      const token = createToken(_.pick(user, ["_id", "role"]));

      res.status(200).json({
        status: "success",
        token,
        user,
      });
    } catch (err) {
      console.log("error when login");
      next(err);
    }
  }
};

exports.forgorPassword = async (req, res) => {
  console.log("Reset pass request data: ", req.body);
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({
      status: "fail",
      message: "User with this email does not exist",
    });
  } else {
    console.log(user);

    let code = await bcrypt.genSalt(10);
    const data = {
      subject: "Edulogy - reset password.",
      to: user.email,
      from: `Edulogy<${process.env.EDULOGY_EMAIL}>`,
      html: `<h2 style="color:#777;font-size:20px;font-weight:300">Use this verify code to reset your password</h2>
                <p>Verify code: ${code}</p>`,
    };
    user.updateOne({ resetPass: code }, (err, success) => {
      if (err) {
        return res.status(400).json({ error: "reset link error" });
      } else {
        sendEmail(data);
        return res
          .status(201)
          .json({
            success: "Verify code was sent to your email",
            mail: `${process.env.IDENT_EMAIL}`,
          });
      }
    });
  }
};

exports.resetPassword = async (req, res) => {
  const { resetPass, newPass } = req.body;
  if (resetPass) {
    let user = await User.findOne({ resetPass: resetPass });
    if (!user) {
      res.status(400).json({
        status: c.STATUS_FAILURE,
        message: "Verify code invalid",
      });
    } else {
      user.password = newPass;
      try {
        await user.save();
        res.status(200).json({
          status: c.STATUS_SUCCESS,
          message: "Password reset successfully",
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          status: c.STATUS_FAILURE,
          message: c.UNKNOWN_ERROR_MSG,
        });
      }
    }
  } else {
    res.status(400).json({
      status: c.STATUS_FAILURE,
      message: "Verify code invalid",
    });
  }
};

exports.addOne = base.addOne(User);

exports.getOne = base.getOne(User);

exports.getAll = base.getAll(User);

exports.update = base.updateOne(User);

exports.delete = base.deleteOne(User);
