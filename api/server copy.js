const express = require("express")
const mongoose = require("mongoose")
// const Router = require("./routes")
const swaggerJSDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
var cors = require('cors')
const app = express()
app.use(express.json())
//const data = require("./server.js")


const options = {
  definition:{
    openapi:'3.0.0',
    info : {
      title : 'Node JS API Project For Mongodb',
      version : '1.0.0'
    },
    servers : [
      {
        url :'http://localhost:8080'
      }
    ]
  },
  
  apis : ["../server.js"]
}

const swaggerSpec = swaggerJSDoc(options)
app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerSpec))

/**
 * @swagger
 * /:
 * get:
 *  summary : This api is used to check get method working or not
 *  description : This api is used to check get method working or not
 *  responses :
 *    200 : 
 *    description : To test get method
 */
app.get('/',(req,resp) => {
  resp.send('Welcome To Mongo Api')
})

// app.use((req, res, next) => {
//   const allowedOrigins = ['http://127.0.0.1:4000', 'http://localhost:3000', 'http://127.0.0.1:4000'];
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//        res.setHeader('Access-Control-Allow-Origin', origin);
//   }
//   //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
//   res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.header('Access-Control-Allow-Credentials', true);
//   return next();
// });
// app.use(cors())

const PORT = 8080
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

// swagger
// app.listen(8080,()=>{
//   mongoose.connect("mongodb://localhost:27017",{useNewUrlParser : true},(error,result)=>{
//     if(error) throw error
//     console.log("resultresult",result)
//     database = result.db("LocalConnection")
//     console.log("connection sucessfully")
//   })
// })