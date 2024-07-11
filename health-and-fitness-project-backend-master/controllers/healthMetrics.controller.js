const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const {
    userHealthMetricsTbl
} = require("../sequelize");

let healthMetricsController = {};

healthMetricsController.addHealthMetrics = async function (req, res) {
    try {
        const {
            weight,
            bloodPressure,
            sleepHours
        } = req.body;

        await userHealthMetricsTbl
            .create({
                weight: weight,
                bloodPressure: bloodPressure,
                sleepHours: sleepHours,
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

healthMetricsController.getAllHealthMetrics = async function (req, res) {
    try {
        let userHealthMetricsTblResult = await userHealthMetricsTbl.findAll({
            where: {
                userIdFk: req.uid
            },
            order: [['createdAt', 'desc']],
            limit: 7
        });
        res.status(200).json({result: userHealthMetricsTblResult});
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

module.exports = healthMetricsController;