const { Problem } = require("../models/problemModel");
const { Comment, validate } = require("../models/commentModel");
const base = require("./baseController");

exports.getOne = async (req, res, next) => {
  try {
    let problem = await Problem.findById(req.params.id)
      .populate({
        path: "comments",
        select: "-subComments",
        populate: {
          path: "user",
          select: "name badge",
        },
      })
      .populate("user", "name badge")
      .lean();
    if (!problem) {
      res.status(404).json({
        status: "fail",
        message: "No document found with that id !",
      });
      return;
    }
    res.status(200).json({
      status: "success",
      doc: problem,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong please try again latter !",
    });
    return;
  }
};

exports.likeOne = async (req, res, next) => {
  try {
    let problem = await Problem.findById(req.params.id);
    if (!problem) {
      res.status(404).json({
        status: "fail",
        message: "No problem found with that id",
      });
      return;
    }
    if (problem.like.indexOf(req.user._id) !== -1) {
      res.status(405).json({
        status: "fail",
        message: "This user already liked this!",
      });
      return;
    }
    let indexInDislike = problem.dislike.indexOf(req.user._id);
    if (indexInDislike !== -1) problem.dislike.splice(indexInDislike, 1);
    problem.like.push(req.user._id);
    await problem.save();
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong please try again latter!",
    });
  }
};

exports.dislikeOne = async (req, res, next) => {
  try {
    let problem = await Problem.findById(req.params.id);
    if (!problem) {
      res.status(404).json({
        status: "fail",
        message: "No problem found with that id",
      });
      return;
    }
    if (problem.dislike.indexOf(req.user._id) !== -1) {
      res.status(405).json({
        status: "fail",
        message: "This user already disliked this!",
      });
      return;
    }
    let indexInLike = problem.like.indexOf(req.user._id);
    if (indexInLike !== -1) problem.like.splice(indexInLike, 1);
    problem.dislike.push(req.user._id);
    await problem.save();
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong please try again latter!",
    });
  }
};

exports.getAll = async (req, res, next) => {
  try {
    let { page, pageSize } = req.query;
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    let totalProblem = await Problem.find({}).lean();
    totalProblem = totalProblem.length;
    let totalPage = Math.ceil(totalProblem / pageSize);
    let problem = await Problem.find({})
      .sort({
        _id: -1,
      })
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .select("-imgs")
      .populate({
        path: "comments",
        select: "-subComments",
        populate: {
          path: "user",
          select: "name badge",
        },
      })
      .populate("user", "name badge")
      .lean();
    res.status(200).json({
      status: "success",
      doc: problem,
      totalPage,
      totalProblem,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong please try again latter !",
    });
    return;
  }
};

exports.addOne = async (req, res, next) => {
  try {
    let problem = new Problem(req.body);
    problem.user = req.user._id;
    await problem.save();
    res.status(201).json({
      status: "success",
      problem,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong please try again latter !",
    });
    return;
  }
};

exports.reply = async (req, res, next) => {
  try {
    let problem = await Problem.findById(req.params.id);
    if (!problem) {
      res.status(404).json({
        status: "fail",
        message: "No document found with that id !",
      });
      return;
    }

    let comment = new Comment(req.body);

    comment.user = req.user._id;

    await comment.save();

    problem.comments.push(comment._id);

    await problem.save();

    this.getOne(req, res, next);
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong please try again latter !",
    });
    return;
  }
};
