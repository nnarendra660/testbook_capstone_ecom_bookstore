//further Api s will store here
const express = require("express");
const router = new express.Router();
const Products = require("../modals/productSchema");
const USER = require("../modals/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/auth");

//get productsdata api test it using api
router.get("/getproducts",async(req,res)=>{
    try {
        const productsdata = await Products.find();
        // console.log("console the data" + productsdata);
        res.status(201).json(productsdata);
    } catch (error) {
        console.log("error" + error.message);
    }
})

//Get individual Data
router.get("/getProductsone/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        // console.log(id);
        const individualdata = await Products.findOne({id:id});
        // console.log(individualdata + "individual data");
        res.status(201).json(individualdata);
    } catch (error) {
        res.status(400).json(individualdata);
        console.log("error" + error.message);
    }
})

//USER Sign-Up[register] Post Api
router.post("/register",async(req,res)=>{
    // console.log(req.body);

    const {fname,email,mobile,password,apassword} = req.body;
    if(!fname || !email || !mobile || !password || !apassword){
        res.status(422).json({error:"fill the all data"});
        console.log("no data available");
    };
    try {
        const preuser = await USER.findOne({email:email});
        if(preuser){
            res.status(422).json({error:"This user is already exist"})
        }else if(password !== apassword){
            res.status(422).json({error:"Password and apassword does not match"})
        }else{
            const finalUser = new USER({
                fname,email,mobile,password,apassword
            })
            const storedata = await finalUser.save();
            console.log(storedata);
            res.status(201).json(storedata);
            
        }
    } catch (error) {
        console.log("error" + error.message);
    }
})
// Server is running on port number 8005
// errorOperation `products.deleteMany()` buffering timed out after 10000ms
// errorCould not connect to any servers in your MongoDB Atlas cluster. One common reason is that you're trying to access the database from an IP that isn't whitelisted. Make sure your current IP address is on your Atlas cluster's IP whitelist: https://www.mongodb.com/docs/atlas/security-whitelist/

//LogIn/SignIn[/login] User Api
// note this login with either email || password
router.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    //if User fill empty details then we show error here
    if(!email || !password){
        res.status(400).json({error:"fill the above details"})
    }
    try {
        const userlogin = await USER.findOne({email:email});
        console.log(userlogin + "user value");
        //
        if(userlogin){
            const isMatch = await bcrypt.compare(password, userlogin.password);
            console.log(isMatch);

            //After Token generate
            const token = await userlogin.generateAuthtoken();
            // console.log(token);

            //we will generate Cookie here
            res.cookie("Booklyweb",token,{
                expires:new Date(Date.now() + 2589000), //ms = 00 minutes cookie will expire in this time.
                httpOnly:true,
                secure:true
            });
            // res.status(201).json(userlogin);
            // console.log("Hello data");
            // console.log(req.cookies.Booklyweb);

            if(!isMatch){
                res.status(400).json({error:"Incorrect email and password"});
                return
            }else{
                res.status(201).json(userlogin);
            }
        }else{
            // console.log("error");
            res.status(400).json({error:"Invalid details"})
        }
    }
    catch (error) {
        // res.status(400).json({error:"Incorrect email and password"})
        console.log(error);
    }
});
//if user login click on Add to cart And Cookie & Secret_key match then user will move on /addCart/:id Page 

//Process-1:Adding Data into shopping-cart-[api]
router.post("/addcart/:id", authenticate, async (req, res)=>{
    try {
        const {id} = req.params;
        console.log("Add to cart");
        const cart = await Products.findOne({id:id});//find one product data when id will match
        console.log(cart + "cart value");
    
        //we recive sented id on this route
        const UserContact = await USER.findOne({_id:req.userID});
        console.log(UserContact,"User milta hain"); 
        //Finally we get here product Id && User Also
        
        //if we found user here then we add data to cart by calling this.function(addcartdata)
        if(UserContact){
            const cartData = await UserContact.addcartdata(cart);
            
            await UserContact.save();
            console.log(cartData,"this will save wait");
            res.status(201).json(UserContact); //id data will successfully addtocart we will sent response to Frontend
        }
        else{
            res.status(401).json({error:"Invalid User Id"}); //if User Not Found
            console.log(error);
        }
    } catch (error) {
        // res.status(401).json({error:"Invalid User Id"});
        console.log(error);
    }
});

//Get Cart Details[API] - Process when this API[cartdetails] Call we check Cookie And WE FIND USER 
router.get("/cartdetails", authenticate, async(req,res)=>{
    try {
        const buyuser = await USER.findOne({_id:req.userID}); //If here we find User [this cart_id and in db[database:_id]]
        res.status(201).json(buyuser); // then we sent response to Frontend
    } catch (error) {
        console.log("error" + error);
    }
})
//This API Will Call On BuyNow Page to get cart details
//Get Cart Details

//Get Valid User when we open website 
router.get("/validuser", authenticate, async(req,res)=>{
    try {
        const validuserone = await USER.findOne({_id:req.userID}); //If here we find User [this cart_id and in db[database:_id]]
        res.status(201).json(validuserone); // then we sent response to Frontend
    } catch (error) {
        console.log("error" + error)
    }
});

//remove item from cart[Api]
router.delete("/remove/:id",authenticate,async(req,res)=>{
    try {
        const {id} = req.params; //onclick-delete-btn on item we will get id 

        //Then with help of authenticate page we verfiy cookie here and get user.
        
        req.rootUser.carts = await req.rootUser.carts.filter((cruval)=>{
            return cruval.cart.id !== id; //while onclink on item we send id and match then filter that id[cartdata-id] will does not will then return.
        });
        //This filter will return an New Array of remaining id that does not match will return.
        req.rootUser.save();
        res.status(201).json(req.rootUser);
        console.log("item removed");
    } catch (error) {
        console.log("error" + error);
        res.status(400).json(req.rootUser);
    }
})

//When User Login First Time Then Token Will Generate And When User Logout We have delete that token

//My Project Last API For USER LOGOUT[API]
router.get("/logout",authenticate,(req,res)=>{
    try {
        //When User Will Click On LogOut Button Then Authentication we need token 
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem)=>{
            return curelem.token !== req.token
        });
        res.clearCookie("Booklyweb",{path:"/"});
        req.rootUser.save();
        res.status(201).json(req.rootUser.tokens);
        console.log("User has been Loged out");
    } catch (error) {
        // res.status(201).json(req.rootUser.tokens);
        console.log("Error For User Logout");
    }
})
module.exports = router;
