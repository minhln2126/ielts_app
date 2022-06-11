const router = require("express").Router();
const { validate } = require("../models/commentModel");
const validator = require("../middleware/validate");
const auth = require("../middleware/auth");
const controller = require("../controllers/commentController");
router.use(auth.protect);
router.put("/like/:id", controller.likeOne);
router.put("/dislike/:id", controller.dislikeOne);
module.exports = router;
