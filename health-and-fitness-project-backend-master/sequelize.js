const { Sequelize } = require("sequelize");
const { DB_HOST, DB_PASS, DB_PORT, DB_USER, DB_NAME } = require("./config");

const userModel = require("./models/user.model");
const goalModel = require("./models/userGoal.model");
const userHealthMetricsModel = require("./models/userHealthMetrics.model");
const userCommentsModel = require("./models/userComments.model");
const userNutritionModel = require("./models/userNutrition.model");

const Op = Sequelize.Op;
const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col,
};

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS,{
  host: DB_HOST,
  dialect: "mysql",
  port: DB_PORT,
  pool: {
    max: 10,
    min: 0,
    acquire: 150000,
    idle: 1000,
  },
  timezone: "+05:30",
  define: {
    freezeTableName: true,
  },
  logging: true,
  operatorsAliases,
});

const userTbl = userModel(sequelize,Sequelize);
const goalTbl = goalModel(sequelize,Sequelize);
const userHealthMetricsTbl = userHealthMetricsModel(sequelize,Sequelize);
const userCommentsTbl = userCommentsModel(sequelize,Sequelize);
const userNutritionTbl = userNutritionModel(sequelize,Sequelize);

sequelize.sync({}).then(() => {
  console.log("Database & tables synced!");
});

module.exports = {
  userTbl,
  goalTbl,
  userHealthMetricsTbl,
  userCommentsTbl,
  userNutritionTbl
};
