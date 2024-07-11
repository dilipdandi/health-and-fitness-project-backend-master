const express = require("express");
const router = express.Router();
const goalController = require("../controllers/goal.controller");

router.route("/addGoal")
    .post(goalController.addGoal);

router.route("/updateGoalStatus")
    .post(goalController.updateGoalStatus);

router.route("/getAllGoals")
    .get(goalController.getAllGoals);

module.exports = router;
