const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const validator = require("../middleware/validator");
const secretKey = "Functionup";

//Creating user details.
const createUser = async function (req, res) {
  try {
    
    let requestBody = req.body;
    

    if (!validator.isValidRequestBody(requestBody)) {
      return res.status(400).send({status:false, msg:"please provide data inside body"});
        
    }

    //Destructuring
    const { fname, lname, title, email, password } = requestBody;

    // Validation  .
    if (!validator.isValid(fname)) {
      return res.status(400).send({status:false, msg:"fname is required"});
    }
    if (!validator.isValid(lname)) {
      return res.status(400).send({status:false, msg:"lname is required"});
    }
    if (!validator.isValid(title)) {
      return res.status(400).send({status:false, msg:"Title is required"});
    }
    if (!validator.isValidTitle(title)) {
      return res.status(400).send({status:false, msg:"Title should be among Mr, Mrs and Miss is required"});
        
      
    }
    if (!validator.isValid(email)) {
      return res.status(400).send({status:false, msg:"email is required"});
    }

    //Email validation whether it is entered perfectly or not.
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      res.status(400).send({status: false,message: "Email should be valid"});
      return;
    }

    if (!validator.isValid(password)) {
       return res.status(400).send({status:false, msg:"password is required"});
       
    }
    const isEmailAlredyUsed = await userModel.findOne({ email });
    if (isEmailAlredyUsed) {
      return res.status(400).send({status:false, msg:"${email} email address is already registered"});
        
    }
  

    const data = await userModel.create(requestBody);
    return res.status(400).send({status:false, msg:"data created successfully"});
      
  } catch (error) {
    res.status(500).send({ status: false, Error: error.message });
  }
};

//Login Api
const loginUser = async function (req, res) {
  try {
    const requestBody = req.body;
    if (!validator.isValidRequestBody(requestBody)) {
      return res.status(400).send({status:false, msg:"Please provide login details inside body"});
       
    }

    //Destructuring
    let { email, password } = requestBody;

    //Validations
    if (!validator.isValid(email)) {
      return res.status(400).send({status:false, msg:"Email address is required for login"});
       
    }

    //Email address validation 
    email = email.trim();
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return res.status(400).send({status:false, msg:"Email address should be valid"});
       
    }
    if (!validator.isValid(password)) {
      
      return res.status(400).send({status:false, msg:"password is required"});
        
    }
    

    const findData = await userModel.findOne({ email, password }); //finding  details inside in DB to get a match of the Email and password or not.

    if (!findData) {
      return res.status(400).send({status:false, msg:"Email address is not  valid then check the email"});
       
    }

    //creating JWT
    let token= jwt.sign({
  userId: duplicateEmail._id,
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now()/ 1000) + 10 *60 * 60
}, "Functionup-key");
    


    return res
      .status(201)
      .send({
        status: true,
      message: `user login successfully`,
        data: { token },
      });
      
  } catch (error) {
    res.status(500).send({ status: false, Error: error.message });
  }
};



  
  

module.exports = {createUser,loginUser};
  