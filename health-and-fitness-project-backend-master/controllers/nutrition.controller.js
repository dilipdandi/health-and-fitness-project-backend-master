const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const {
    userNutritionTbl
} = require("../sequelize");

let nutritionController = {};

nutritionController.addNutrition = async function (req, res) {
    try {
        const {
            foodName,
            mealTime,
            calories
        } = req.body;

        await userNutritionTbl
            .create({
                foodName: foodName,
                mealTime: mealTime,
                calories: calories,
                userIdFk: req.uid
            })
            .then((obj) => {
                res.status(201).send("saved to database");
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

nutritionController.deleteNutrition = async function (req, res) {
    try {
        const {
            nutritionId
        } = req.body;
        await userNutritionTbl.destroy({
            where: {id: nutritionId}
        });
        res.status(200).json({ message: "Nutrition deleted successfully." });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

nutritionController.getAllNutrition = async function (req, res) {
    try {
        let userNutritionTblResult = await userNutritionTbl.findAll({
            where: {
                userIdFk: req.uid
            },
            order: [['createdAt', 'desc']],
        });
        res.status(200).json({result: userNutritionTblResult});
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

module.exports = nutritionController;