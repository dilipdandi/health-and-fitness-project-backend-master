const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const {
    userTbl, userCommentsTbl
} = require("../sequelize");
const {
    SECRET_KEY
} = require("../config");

let publicController = {};

publicController.registerUser = async function (req,res) {
    try {
        const {
            name,
            mobile,
            email,
            password,
        } = req.body;

        //* encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //* insert into database
        await userTbl
            .create({
                name: name,
                password: hashedPassword,
                mobile: mobile,
                email: email
            })
            .then((obj) => {
                res.status(201).send("saved to database");
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
}

publicController.login = async function (req,res) {
    try {
        const {
            mobile,
            password,
        } = req.body;

        //* find user record from database
        let userTblObj = await userTbl.findOne({
            where: {
                mobile: mobile
            }
        });

        if (userTblObj) {
            //* check password is correct
            await userTbl.isCorrectPassword(userTblObj.id, password, (err, same) => {
                if (err) {
                    res.status(500).json({error: "Password is incorrect."});
                } else {
                    if (same) {
                        //* create and set cookie to browser
                        const payload = {
                            uid: userTblObj.id
                        };
                        const token = jwt.sign(payload, SECRET_KEY,{
                            expiresIn: "12h",
                        });
                        const cookieOptions = {
                            maxAge: 43200000,
                            // httpOnly: true,
                        };
                        res.cookie('auth_token', token, cookieOptions).sendStatus(200);
                    } else {
                        res.status(500).json({ error: "Password is incorrect." });
                    }
                }
            });
        }
        else {
            res.status(500).json({ error: "Mobile is incorrect." });
        }
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
}

publicController.getAllComments = async function (req, res) {
    try {
        const { blogId } = req.query;
        let userCommentsTblResult = await userCommentsTbl.findAll({
            where: {
                blogId: blogId
            },
            order: [['createdAt', 'desc']],
        });
        res.status(200).json({result: userCommentsTblResult});
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

publicController.logout = async function (req,res) {
    const cookieOptions = {
        maxAge: 100,
        httpOnly: true,
    };
    res.cookie('auth_token', 'thoy', cookieOptions).sendStatus(200);
}

module.exports = publicController;