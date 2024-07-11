const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const {
    userCommentsTbl, userTbl
} = require("../sequelize");

let commentsController = {};

commentsController.addComment = async function (req, res) {
    try {
        const {
            blogId,
            comment
        } = req.body;
        let userTblObj = await userTbl.findByPk(req.uid);
        await userCommentsTbl
            .create({
                blogId: blogId,
                userName: userTblObj.name,
                comment: comment,
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

module.exports = commentsController;