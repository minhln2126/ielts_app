const router = require("express").Router();

const auth = require("../middleware/auth");
const validator = require("../middleware/validate");
const { validate } = require("../models/problemModel");
const commentValidate = require("../models/commentModel").validate;
const controller = require("../controllers/problemController");

router.get("/", controller.getAll);

router.get("/:id", controller.getOne);

router.use(auth.protect);
router.get("/like/:id", controller.likeOne);
router.get("/dislike/:id", controller.dislikeOne);
router.post("/", validator(validate), controller.addOne);
router.post("/reply/:id", validator(commentValidate), controller.reply);

module.exports = router;
