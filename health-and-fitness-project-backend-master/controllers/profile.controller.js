const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const {
    userTbl
} = require("../sequelize");
const bcrypt = require("bcrypt");

let profileController = {};

profileController.getMyProfile = async function (req, res) {
    try {
        let userTblObj = await userTbl.findByPk(req.uid);
        if (userTblObj) {
            res.status(200).json({
                name: userTblObj.name,
                mobile: userTblObj.mobile,
                email: userTblObj.email
            });
        } else {
            res.status(500).json({ error: "Profile not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

profileController.updateMyProfile = async function (req, res) {
    try {
        const {
            name,
            mobile,
            email,
            password,
        } = req.body;

        let userTblObj = await userTbl.findByPk(req.uid);
        if (userTblObj) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            await userTblObj.update({
                name: name,
                password: hashedPassword,
                mobile: mobile,
                email: email
            });
            res.status(200).json({ message: "Profile updated successfully." });
        } else {
            res.status(500).json({ error: "Profile not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

module.exports = profileController;