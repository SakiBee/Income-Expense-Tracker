const {appErr, AppErr} = require("../utils/appErr");
const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");

const isLogin = (req, res, next) => {
  //get token from header
  const token = getTokenFromHeader(req);
  if (!token) {
    return next(appErr("There is no token attached to the header", 401));
  }
  //verify
  const decodedUser = verifyToken(token);
  if(!decodedUser) {
    return next(appErr("Invalid/Expired token, Please login again", 401));
  }
  //save the user into req obj
  req.user = decodedUser.id;
  next();
  
};

module.exports = isLogin;