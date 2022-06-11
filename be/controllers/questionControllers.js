const base = require("./baseController");
const { Question } = require("../models/questionModel");

exports.getOne = base.getOne(Question);
exports.getAll = base.getAll(Question);
exports.addOne = base.addOne(Question);
exports.updateOne = base.updateOne(Question);
