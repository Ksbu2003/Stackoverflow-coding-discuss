const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const path = require("path");
const app = express();
const dbConnect=require('./dbconnection.js');

dbConnect();
// Body parser Middleware
app.use(express.json());

// logger Middleware. --DEV mode.
app.use(require("./middleware/logger"));

// use routes.
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));


// const uri = "mongodb://localhost:27017/test";
// mongoose.set('strictQuery', true);
// mongoose.connect(uri).then(()=>{
//     console.log("connection successful to DB");
// }).catch((err)=>{
//     console.log(err);
// });


// Production step.
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html")); // relative path
  });
}

// Port Variable
const PORT = process.env.PORT || 8000;

// listenting to server.
app.listen(PORT, () => console.log(`Server is started on PORT : ${PORT}`));
