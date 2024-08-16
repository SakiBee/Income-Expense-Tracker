const Account = require("../../models/accounts/Account");
const User = require("../../models/users/User");
const {appErr, AppErr} = require("../../utils/appErr");


//create accounts
const createAccountCtrl = async(req, res, next) => {
  const {name, accountType, initialBalance, notes} = req.body;
  try {
    //find user, create, push account, resave
    const userFound = await User.findById(req.user);
    if(!userFound) return next(appErr("User not found", 404));

    const account = await Account.create({
      name,
      accountType,
      initialBalance,
      notes,
      createdBy: req.user,
    });

    userFound.accounts.push(account._id);
    await userFound.save();

    res.json({
      status: "success",
      data: account,
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};

//get all accounts
const getAccountsCtrl = async(req, res, next) => {
  try {
    const accounts = await Account.find().populate("transactions");
    res.json({
      status: "success",
      data: accounts
    });
  } catch (error) {
    return next(appErr(error));
  }
};

//get single accounts
const getAccountCtrl = async(req, res, next) => {
  try {
    const account = await Account.findById(req.params.id).populate("transactions");
    res.json({
      status: "success",
      data: account
    });
  } catch (error) {
    return next(appErr(error));
  }
};

//delete accounts
const deleteAccountCtrl = async(req, res, next) => {
  try {
    await Account.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    return next(appErr(error));
  }
};

//update accounts
const updateAccountCtrl = async(req, res, next) => {
  try {
    const account = await Account.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidator: true
    });
    if(!account) return next(appErr("Account not found", 404));

    res.status(200).json({
      status: "success",
      data: account
    });
  } catch (error) {
    return next(appErr(error));
  }
};

module.exports = {
  createAccountCtrl,
  getAccountsCtrl,
  getAccountCtrl,
  deleteAccountCtrl,
  updateAccountCtrl
}