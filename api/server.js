const express = require("express")
const mongoose = require("mongoose")
// const Router = require("./routes")
var cors = require('cors')
const app = express()

app.use((req, res, next) => {
  const allowedOrigins = ['http://127.0.0.1:4000', 'http://localhost:3000', 'http://127.0.0.1:4000'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});
app.use(cors())

const PORT = 4000
app.listen(PORT, () => {
  console.log(`app is listening to PORT ${PORT}`)
})
// app.use(Router);


mongoose.connect("mongodb://localhost:27017/LocalConnection", {
  useNewUrlParser: "true",
})
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})