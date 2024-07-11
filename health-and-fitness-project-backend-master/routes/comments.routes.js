const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments.controller");

router.route("/addComment")
    .post(commentsController.addComment);

module.exports = router;
