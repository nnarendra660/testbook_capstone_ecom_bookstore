const jwt = require("jsonwebtoken");
const USER = require("../modals/userSchema");
const keysecret = process.env.KEY;

//Process-2:define middleware function here
//campare id and get user id and store 
const authenticate = async(req, res, next)=>{
    try {
        // console.log(req,"authenticate middleware");
        // console.log(req.cookies);
        const token = req.cookies.Booklyweb; //getting cookie value and store this.value in token
        const verifyToken = jwt.verify(token,keysecret); //Then Verify{Cookies with secretkey} And after verify it will return-[id]
        // console.log(verifyToken);

        const rootUser = await USER.findOne({_id:verifyToken._id,"tokens.token":token}); //Then with help of id we will get user And _id[db id] compare with verifyToken OR Also tokens.token[db] compare token
        console.log(rootUser);
        
        //Then if user does not exist in db then we will throw an error
        if(!rootUser){throw new Error("User not found")};
        //If User Found-On router page we send a UserID on that route 
        req.token = token //when user req.token on api then this value will send 
        req.rootUser = rootUser ///send user also
        req.userID = rootUser._id //send id also
        next();
        
    } catch (error) {
        res.status(401).send("Unautherized:No token provide") //if user is not valid then we show this. error
        console.log(error);
    }
}

module.exports = authenticate;