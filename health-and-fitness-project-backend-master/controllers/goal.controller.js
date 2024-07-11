const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const {
    goalTbl
} = require("../sequelize");

let goalController = {};

goalController.addGoal = async function (req, res) {
    try {
        const {
            goalName,
            goalDate,
            weight,
            goalStatus
        } = req.body;

        await goalTbl
            .create({
                goalName: goalName,
                goalDate: goalDate,
                weight: weight,
                goalStatus: goalStatus,
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

goalController.updateGoalStatus = async function (req, res) {
    try {
        const {
            goalId,
            goalStatus
        } = req.body;

        let goalTblObj = await goalTbl.findByPk(goalId);
        if (goalTblObj) {
            await goalTblObj.update({
                goalStatus: goalStatus
            });
            res.status(200).json({ message: "Goal updated successfully." });
        } else {
            res.status(500).json({ error: "Goal not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

goalController.getAllGoals = async function (req, res) {
    try {
        let goalTblResult = await goalTbl.findAll({
            where: {
                userIdFk: req.uid
            },
            order: [['createdAt', 'desc']],
        });
        res.status(200).json({result: goalTblResult});
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

module.exports = goalController;