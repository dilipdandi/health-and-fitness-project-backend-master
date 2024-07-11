const express = require("express");
const router = express.Router();
const nutritionController = require("../controllers/nutrition.controller");

router.route("/addNutrition")
    .post(nutritionController.addNutrition);

router.route("/deleteNutrition")
    .delete(nutritionController.deleteNutrition);

router.route("/getAllNutrition")
    .get(nutritionController.getAllNutrition);

module.exports = router;
