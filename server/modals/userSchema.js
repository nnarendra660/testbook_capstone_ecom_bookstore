//Sechema of usermodal
const mongoose = require('mongoose');
const validator = require("validator");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const secretkey = process.env.KEY;

//Define User Schema here
const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true, //user should have to fill the fields
        trim : true //Remove Left And Right Extra-Space
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ("not valid email address")
            }
        }
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
        maxlength : 10 //maximum number should be 10 digit
    },
    password:{
        type:String,
        required:true,
        // maxlength : 6
    },
    apassword:{
        type:String,
        required:true,
        // maxlength : 6
    },
    tokens : [
        {
            token : {
                type:String,
                required:true,
            }
        }
    ],
    carts : Array
    // carts:[
    //     {
    //         cart:Object
    //     }
    // ]
});
//Define User Schema here

//hashing using bcryptjs the passwords
userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,12);  //Tow arguments-round[12-for_hashing-this-will-take-time]
        this.apassword = await bcrypt.hash(this.apassword,12);
    }
    next();
})

//Token Generate Process :- install jwt[npm i jsonwebtoken]
userSchema.methods.generateAuthtoken = async function(){
    try {
        let token = jwt.sign({_id:this._id},secretkey);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        console.log("error");
    }
}

//Process-3:How to add data to Cart-Data after creating api,auth,schema
//instant methods function for add data to cart at user id
userSchema.methods.addcartdata = async function(cart){
    try {
        this.carts = this.carts.concat({cart});
        await this.save();
        return this.carts
    } catch (error) {
        console.log("error");
    }
}


//this hasing should be before modal !important.
 //Sourabh -> encrypt [Meanless] SujugA ->> decrypt- longintime -> Sourabh with hashing Algorithm
//Onlogin tiem we will compare the data using bcryptjs

//password hashing process npm i bcryptjs

//modal[userSchema] && collection name-[Booklyweb][User]
const USER = new mongoose.model("USER", userSchema);

module.exports = USER;