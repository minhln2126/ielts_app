const mongoose = require("mongoose");
const joi = require("joi");
const problemSchema = mongoose.Schema({
  title: String,
  content: String,
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
    like: joi.array(),
    dislike: joi.array(),
    imgs: joi.array().items(joi.string()),
  });

  return schema.validate(problem);
};

const Problem = mongoose.model("problem", problemSchema);

module.exports = {
  Problem,
  validate,
};
