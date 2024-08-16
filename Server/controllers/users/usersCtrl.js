const bcrypt = require("bcryptjs");
const User = require("../../models/users/User");
const Account = require("../../models/accounts/Account");
const Transaction = require("../../models/transactions/Transaction");
const {appErr, AppErr} = require("../../utils/appErr");
const generateToken = require("../../utils/generateTokens");

//register
const registerUserCtrl = async(req, res, next) => {
  const {fullname, password, email} = req.body;
  try {
    //1. check email existance
    const userFound = await User.findOne({email});
    if(userFound) return next(new Error("User already exists"));

    //2. Check any fields is empty(MongoDB handle it automatically)
    if(!email || !password || !fullname) {
      return next(new Error("Please provide all fields"));
    }
    //3. Hash password 
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    //create user
    const user = await User.create({
      fullname, email, password: hashedPass,
    });
    res.json({
      status: "success",
      fullname: user.fullname,
      id: user.id,
      msg: "user registered successfully"});
  } catch (error) {
    res.json(error);
    next(new Error(error.message));
  }
};

//login
const loginUserCtrl = async(req, res, next) => {
  const {email, password} = req.body
  try {
    //1. check email is exist
    const userFound = await User.findOne({email});
    if(!userFound) return next(new AppErr("Invalid credentials", 400));

    //check password
    const isPassMatched = await bcrypt.compare(password, userFound.password);
    if(!isPassMatched) return next(appErr("Invalid credentials", 400));

    res.json({
      status: "success",
      fullname: userFound.fullname,
      id: userFound._id,
      token: generateToken(userFound._id)     
    });
  } catch (error) {
    next(new Error(error.message));
  }
};

//profile
const profileUserCtrl = async(req, res, next) => {
  try {
    const user = await User.findById(req.user).populate ({
      path: "accounts",
      populate: {
        path: "transactions",
        model: "Transaction"
      },
    });
    if(!user) {
      return next(new AppErr("User not Found", 404));
    }
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};

//delete user
const deleteUserCtrl = async(req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user);
    res.status(200).json({
      status: "success",
      data: null,
    });
    
  } catch (error) {
    return next(appErr(error));
  }
};

//update user
const updateUserCtrl = async(req, res, next) => {
  try {
    if(req.body.email) {
      const userFound = await User.findOne({email: req.body.email});
      if(userFound) return next(appErr("Email is already exist"), 400);
    }
    if(req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt);
      const user = await User.findByIdAndUpdate(
        req.user,
        { password: hashedPass},
        {
          new: true,
          runValidator: true
        }
      );
      return res.status(200).json({
        status: "success",
        data: user
      });
    }

    const user = await User.findByIdAndUpdate(req.user, req.body, {
      new: true,
      runValidator: true
    });

    res.status(200).json({
        status: "success",
        data: user
      });
    
  } catch (error) {
    return next(appErr(error.message));
  }
};

module.exports = {
  registerUserCtrl,
  loginUserCtrl,
  deleteUserCtrl,
  updateUserCtrl,
  profileUserCtrl
}