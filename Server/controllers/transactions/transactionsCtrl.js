const Account = require("../../models/accounts/Account");
const User = require("../../models/users/User");
const Transaction = require("../../models/transactions/Transaction");
const {appErr, AppErr} = require("../../utils/appErr");


//create transactions
const createTransCtrl = async(req, res, next) => {
  try {
    const {name, transactionType, amount, category, notes,account} = req.body;
    //find user, find account, create trans, push trans, save it
    const userFound = await User.findById(req.user);
    if(!userFound) return next(appErr("User not found", 404));

    const accountFound = await Account.findById(account);
    if(!accountFound) return next(appErr("Account not found", 404));
    
    const transaction = await Transaction.create({
      name, 
      transactionType, 
      amount, 
      category, 
      notes, 
      account,
      createdBy: req.user,
    });

    accountFound.transactions.push(transaction._id);
    await accountFound.save();

    res.json({
      status: "success",
      data: transaction,
    });
  } catch (error) {
    return next(appErr(error));    
  }
};

//get all transactions
const getAllTransCtrl = async(req, res, next) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json({
      status: "success",
      data: transactions
    });
  } catch (error) {
    return next(appErr(error));
  }
};

//get transaction
const getTransCtrl = async(req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: transaction
    });
  } catch (error) {
    return next(appErr(error));
  }
};

//delete transactions
const deleteTransCtrl = async(req, res, next) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      data: null,
    });
  } catch (error) {
    return next(appErr(error));
  }
};

//update transactions
const updateTransCtrl = async(req, res, next) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidator: true
    });
    res.status(200).json({
      status: "success",
      data: transaction
    });
  } catch (error) {
    return next(appErr(error));
  }
};


module.exports = {
  createTransCtrl,
  getAllTransCtrl,
  getTransCtrl,
  updateTransCtrl,
  deleteTransCtrl
}