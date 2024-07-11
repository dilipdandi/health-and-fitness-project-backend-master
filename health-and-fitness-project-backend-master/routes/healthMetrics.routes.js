const express = require("express");
const router = express.Router();
const healthMetrics = require("../controllers/healthMetrics.controller");

router.route("/addHealthMetrics")
    .post(healthMetrics.addHealthMetrics);

router.route("/getAllHealthMetrics")
    .get(healthMetrics.getAllHealthMetrics);

module.exports = router;
