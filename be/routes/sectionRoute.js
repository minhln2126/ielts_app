const router = require("express").Router();

const controller = require("../controllers/sectionController");
const validator = require("../middleware/validate");
const { validate } = require("../models/sectionModel");

router.post("/", validator(validate), controller.addOne);

module.exports = router;
