const express = require("express");
const router = express.Router();

const { validate } = require("../models/userModel");
const validator = require("../middleware/validate");
const auth = require("../middleware/auth");
const userController = require("../controllers/userController");

router.post("/login", userController.login);

router.post("/signup", validator(validate), userController.signup);

router.get("/:id", userController.getOne);

router.put("/forgot-password", userController.forgorPassword);

router.put("/reset-password", userController.resetPassword);

router.use(auth.protect);

router.put("/:id", userController.update);

router.use(auth.restrictTo("admin"));

router.post("/", validator(validate), userController.addOne);

router.get("/", userController.getAll);

router.delete("/:id", userController.delete);

module.exports = router;
