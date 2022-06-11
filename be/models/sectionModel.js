const mongoose = require("mongoose");
const joi = require("joi");

const sectionSchema = new mongoose.Schema(
  {
    paragraph: {
      type: {
        title: String,
        content: [String],
      },
      _id: false,
    },
    script: {
      type: String,
      trim: true,
      default: "",
    },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "question" }],
  },
  {
    versionKey: false,
  }
);

const validate = (section) => {
  const schema = joi
    .object({
      script: joi.string().allow(null, ""),
      paragraph: joi.object().allow(null),
      questions: joi.array(),
    })
    .unknown(true);
  return schema.validate(section);
};

const Section = mongoose.model("section", sectionSchema);

module.exports = {
  validate,
  Section,
};
