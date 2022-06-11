const mongoose = require("mongoose");
const joi = require("joi");
const commentSchema = mongoose.Schema({
  content: String,
  date: String,
  user: { type: mongoose.Types.ObjectId, ref: "user" },
  like: [{ type: mongoose.Types.ObjectId, ref: "user" }],
  dislike: [{ type: mongoose.Types.ObjectId, ref: "user" }],
  imgs: [String],
});
const validate = (comment) => {
  const schema = joi.object({
    content: joi.string().required(),
    date: joi.string().required(),
    like: joi.array(),
    dislike: joi.array(),
    imgs: joi.array().items(joi.string()),
  });
  return schema.validate(comment);
};
const Comment = mongoose.model("comment", commentSchema);
module.exports = {
  Comment,
  validate,
};
