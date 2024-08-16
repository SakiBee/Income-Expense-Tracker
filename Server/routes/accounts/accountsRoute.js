const express = require("express");
const { createAccountCtrl, getAccountsCtrl, getAccountCtrl, deleteAccountCtrl, updateAccountCtrl } = require("../../controllers/accounts/accountsCtrl");
const accountsRoute = express.Router();
const isLogin = require("../../middlewares/isLogin");

//POST/api/v1/accounts
accountsRoute.post("/", isLogin, createAccountCtrl);

//GET/api/v1/accounts/:id
accountsRoute.get("/:id", isLogin, getAccountCtrl);

//GET/api/v1/accounts/
accountsRoute.get("/", isLogin, getAccountsCtrl);

//DELETE/api/v1/accounts/:id
accountsRoute.delete("/:id", isLogin, deleteAccountCtrl);

//PUT/api/v1/accounts/:id
accountsRoute.put("/:id", isLogin, updateAccountCtrl);

module.exports = accountsRoute;