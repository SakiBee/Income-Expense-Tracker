const mongoose = require("mongoose");

//connect

const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb+srv://mksakibuddin0:N0Tiq2U0Xq8U0XhN@mongodb-demo.qqtyw3h.mongodb.net/income-expenses-app?retryWrites=true&w=majority&appName=mongodb-demo");
    console.log("Db Connected successfully");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};


dbConnect();