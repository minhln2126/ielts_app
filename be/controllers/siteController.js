const { Test } = require("../models/testModel");
const { Question } = require("../models/questionModel");
const { User } = require("../models/userModel");
const { Comment } = require("../models/commentModel");
const { Post } = require("../models/postModel");

exports.homePage = async (req, res, next) => {
  try {
    let reading = await Test.find({ type: "reading" })
      .sort({ _id: -1 })
      .limit(5)
      .lean();
    let listening = await Test.find({ type: "listening" })
      .sort({ _id: -1 })
      .limit(5)
      .lean();
    res.status(200).json({
      status: "success",
      data: {
        reading,
        listening,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong please try again latter",
    });
  }
};

exports.adminPage = async (req, res, next) => {
  try {
    const tests = await Test.find({}).populate("questions").lean();
    const questions = await Question.find({}).lean();
    const users = await User.find({}).sort("role").lean();
    const posts = await Post.find({}).lean();
    res.status(200).json({
      status: "success",
      tests,
      questions: questions.length,
      users,
      posts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong please try again latter!",
    });
  }
};
