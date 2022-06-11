const router = require("express").Router();

const controller = require("../controllers/siteController");

router.get("/home", controller.homePage);

router.get("/admin", controller.adminPage);

module.exports = router;
