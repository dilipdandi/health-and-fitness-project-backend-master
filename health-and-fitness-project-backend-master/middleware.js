const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("./config");

const withAuth = function (req, res, next) {
  const token = req.cookies.auth_token;
  if (!token) {
    res.status(401).send("Unauthorized: No token provided");
  } else {
    jwt.verify(token, SECRET_KEY, function (err, decoded) {
      if (err) {
        res.status(401).send("Unauthorized: Invalid token");
      } else {
        req.uid = decoded.uid;
        next();
      }
    });
  }
};

module.exports = withAuth;
