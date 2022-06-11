const express = require("express");
const router = express.Router();

const validator = require("../middleware/validate");
const auth = require("../middleware/auth");
const { validate } = require("../models/questionModel");
const questionController = require("../controllers/questionControllers");

router.get("/", questionController.getAll);
router.get("/:id", questionController.getOne);

// router.use(auth.protect);
// router.use(auth.restrictTo("admin"));

router.post("/", validator(validate), questionController.addOne);
router.put("/:id", questionController.updateOne);
module.exports = router;
