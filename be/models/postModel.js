const mongoose = require("mongoose");
const joi = require("joi");
const postSchema = mongoose.Schema({
  title: String,
  content: String,
  view: {
    type: Number,
    default: 0,
  },
  date: String,
  user: { type: mongoose.Types.ObjectId, ref: "user" },
  imgs: [String],
  comments: [{ type: mongoose.Types.ObjectId, ref: "comment" }],
  like: [{ type: mongoose.Types.ObjectId, ref: "user" }],
  dislike: [{ type: mongoose.Types.ObjectId, ref: "user" }],
});
const validate = (problem) => {
  const schema = joi.object({
    title: joi.string().required(),
    content: joi.string().required(),
    user: joi.string(),
    comments: joi.array(),
    date: joi.string().required(),
    like: joi.array(),
    view: joi.number(),
    dislike: joi.array(),
    imgs: joi.array().items(joi.string()),
  });
  return schema.validate(problem);
};
const Post = mongoose.model("post", postSchema);
module.exports = { Post, validate };
