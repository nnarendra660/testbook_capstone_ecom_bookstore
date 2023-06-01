// 2] Install-Dependencies > npm i express mongoose dotenve > start
//Create Server 
require("dotenv").config();
const express = require("express");
const app = express();
//2]end
// 3] Connect Database[MongoDB Atlas > that we can access from anywhere[or use compass for local]] > start
const mongoose = require("mongoose");
require("./db/connection");
const path = require('path');
// 3] Connect Database > end
// 4] Structure a schema for productschema > start
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const Products = require("./modals/productSchema");
// 4] Structure a schema and define modals for productschema > end
const DefaultData = require("./defaultdata");
const cors = require("cors");
const router = require("./routes/router");

app.use(express.json()); //data will sent in json format
app.use(cors()); //port error will not show
app.use(helmet());
app.use(cookieParser());
app.use(router);
//HOSTING PROCESS ON HEROKU FOR DEPLOYMENT : START
const port = process.env.PORT || 8005;
app.use(express.static(path.join(__dirname,'/client/build')))
app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'/client/build/index.html'));
})
// if(process.env.NODE_ENV === "production"){
//     app.use(express.static("client/build"))
// }
//HOSTING PROCESS ON HEROKU : END

app.listen(port,()=>{
    console.log(`Server is running on port number ${port}`);
});
//Server Created 

DefaultData();