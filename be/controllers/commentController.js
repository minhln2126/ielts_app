const { Comment } = require("../models/commentModel");
const base = require("./baseController");
const c = require("../constants");
exports.getOne = async (req, res, next) => {
  try {
    let comment = await Comment.findById(req.params.id)
      .populate("user", "name")
      .lean();
    if (!comment) {
      res.status(404).json({
        status: "fail",
        message: "No document found with that id",
      });
      return;
    }
    res.status(200).json({
      status: "success",
      doc: comment,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong please try again latter",
    });
  }
};
exports.likeOne = async (req, res, next) => {
  try {
    const doc = await Comment.findById(req.params.id);
    if (!doc) {
      res.status(404).json({
        status: "fail",
        message: c.DOCUMENT_NOT_FOUND_ERROR,
      });
      return;
    }
    let likeIndex = doc.like.indexOf(req.user._id);
    if (likeIndex === -1) doc.like.push(req.user._id);
    let dislikeIndex = doc.dislike.indexOf(req.user._id);
    if (dislikeIndex !== -1) doc.dislike.splice(dislikeIndex, 1);
    await doc.save();
    this.getOne(req, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong please try again latter !",
    });
  }
};
exports.dislikeOne = async (req, res, next) => {
  try {
    const doc = await Comment.findById(req.params.id);
    if (!doc) {
      res.status(404).json({
        status: "fail",
        message: c.DOCUMENT_NOT_FOUND_ERROR,
      });
      return;
    }
    let likeIndex = doc.like.indexOf(req.user._id);
    if (likeIndex !== -1) doc.like.splice(likeIndex, 1);
    let dislikeIndex = doc.dislike.indexOf(req.user._id);
    if (dislikeIndex === -1) doc.dislike.push(req.user._id);
    await doc.save();
    this.getOne(req, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong please try again latter !",
    });
  }
};
exports.updateOne = base.updateOne(Comment);
