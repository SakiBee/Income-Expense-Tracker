const jwt = require("jsonwebtoken");

const varifyToken = token => {
  try {
    return jwt.verify(token, "anykey");
  } catch (err) {
    return false;
  }
};

module.exports = varifyToken; 