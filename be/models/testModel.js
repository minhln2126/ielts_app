const mongoose = require("mongoose");
const joi = require("joi");
const testSchema = new mongoose.Schema({
  img: String,
  time: Number,
  name: String,
  type: String,
  script: String,
  sections: [{ type: mongoose.Schema.Types.ObjectId, ref: "section" }],
});

const validate = (test) => {
  const schema = joi
    .object({
      name: joi.string().min(4).required(),
      type: joi.string(),
      time: joi.number().min(1).required(),
      img: joi.string().required(),
      sections: joi.array(),
      script: joi.string(),
    })
    .unknown(true);
  return schema.validate(test);
};

const Test = mongoose.model("test", testSchema);

module.exports = {
  Test,
  validate,
};
