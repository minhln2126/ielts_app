const router = require("express").Router();

const testController = require("../controllers/testController");
const validator = require("../middleware/validate");
const auth = require("../middleware/auth");
const { validate } = require("../models/testModel");

router.get("/", testController.getAll);
router.get("/:id", testController.getOne);
router.post("/", validator(validate), testController.addOne);
router.put("/:id", testController.updateOne);

router.use(auth.protect);
router.use(auth.restrictTo("admin"));

router.delete("/:id", testController.deleteOne);

module.exports = router;
