const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
let cookieParser = require("cookie-parser");
const { NODE_ENV, PORT } = require("./config");
const { userTbl } = require("./sequelize");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const withAuth = require("./middleware");

let publicRoute = require("./routes/public.routes");
let profileRoute = require("./routes/profile.routes");
let goalRoute = require("./routes/goal.routes");
let healthMetricsRoute = require("./routes/healthMetrics.routes");
let commentsRoute = require("./routes/comments.routes");
let nutritionRoute = require("./routes/nutrition.routes");

const app = express();
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}));
app.options('*',cors({
    credentials: true,
    origin: 'http://localhost:3000',
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//* api to validate if user is login or not
app.get("/api/checkToken", withAuth, function (req,res) {
    res.json({ id: req.uid }).status(200);
});

app.use("/api/publicApi", publicRoute);
app.use("/api/profileApi", withAuth, profileRoute);
app.use("/api/goalApi", withAuth, goalRoute);
app.use("/api/healthMetricsApi", withAuth, healthMetricsRoute);
app.use("/api/commentsApi", withAuth, commentsRoute);
app.use("/api/nutritionApi", withAuth, nutritionRoute);

app.get("/", function (req,res) {
    res.status(200).send("Welcome to backend api server");
});

app.use(function (req,res) {
    res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode`);
});

