const express = require("express");
let router = express.Router();
let publicController = require("../controllers/public.controller");

router.post('/registerUser', publicController.registerUser);

router.post('/login', publicController.login);

router.get('/getAllComments', publicController.getAllComments);

router.get('/logout', publicController.logout);

module.exports = router;