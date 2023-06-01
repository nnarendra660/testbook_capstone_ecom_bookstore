const mongoose = require("mongoose");
const DB = process.env.DATABASE; //DB

// Database connected with node app
mongoose.connect(DB)
.then(()=>console.log("Database Connected Successfully..."))
.catch((error)=>console.log("error" + error.message))

// 4] get all products in constant > productdata
// 4] Structure a schema for productschema