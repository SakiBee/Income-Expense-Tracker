const express = require("express");
const { createTransCtrl, getAllTransCtrl, getTransCtrl, deleteTransCtrl, updateTransCtrl } = require("../../controllers/transactions/transactionsCtrl");
const transactionsRoute = express.Router();
const isLogin = require("../../middlewares/isLogin");


//POST/api/v1/transactions
transactionsRoute.post("/", isLogin, createTransCtrl);

//GET/api/v1/transactions
transactionsRoute.get("/", getAllTransCtrl);

//GET/api/v1/transactions/:id
transactionsRoute.get("/:id", getTransCtrl);

//DELETE/api/v1/transactions/:id
transactionsRoute.delete("/:id", deleteTransCtrl);

//PUT/api/v1/transactions/:id
transactionsRoute.put("/:id", updateTransCtrl);


module.exports = transactionsRoute;