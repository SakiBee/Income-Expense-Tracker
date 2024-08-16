const express = require("express")
const cors = require("cors");
const globalErrHandler = require("./middlewares/globalErrHandling")
require("./config/dbConnect");
const app = express();
const usersRoute = require("./routes/users/usersRoute");
const accountsRoute = require("./routes/accounts/accountsRoute");
const transactionsRoute = require("./routes/transactions/transactionsRoute");

//middlewares
app.use(express.json()); //pass incoming data
app.use(cors()); //cors middleware

//routes
app.use("/api/v1/users", usersRoute); //user routes
app.use("/api/v1/accounts", accountsRoute); //account routes
app.use("/api/v1/transactions", transactionsRoute);//transaction routes

//error handling
app.use(globalErrHandler)
//listen to server
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`server is running on port ${PORT}`));
