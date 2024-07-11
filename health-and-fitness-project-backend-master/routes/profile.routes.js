const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile.controller");

router.route("/getMyProfile")
    .get(profileController.getMyProfile);

router.route("/updateMyProfile")
    .post(profileController.updateMyProfile);

module.exports = router;
