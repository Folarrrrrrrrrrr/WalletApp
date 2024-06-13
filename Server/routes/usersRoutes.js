const router = require("express").Router();
const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require ('../models/index')
const  bodyParser =require('body-parser')

//Accounts registration

// router.post("/register", async (req, res) => {
const register= async (req, res) => {
  try {

    const {firstname, 
      lastname,
      phoneNumber,
      identificationNumber,
      identificationType,
      password,
      address,
      email,
      balance
    } = req.body

    //checking duplicate user, if user is existing before saving user again
    const User = await db.models.User.findOne({ where: {email: req.body}});
    if (User) {
      return res.send({
        success: false,
        message: "user already exists",
      });
    }
    
    
    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // req.body.password = hashedPassword;

    // const newUser = new User(req.body);
    // const newUser = await new db.models.User.create(req.body);
    const newUser = await db.models.User.create({
      firstname,
      lastname,
      phoneNumber,
      identificationNumber,
      identificationType,
      password: hashedPassword,
      isVerified,
      address,
      email,
      balance: {
        type: Number,
        default: 0
    }
  });
    await newUser.save();

    res.send({
      message: "user saved successfully",
      data: null, // we are setting data to null here because we dont want to send the password to the frontend
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
// });
}

//Login Logics

// router.post("/login", async (req, res) => {
const login = async (req, res) => {
  try {
    //checking for user existence using the imputed email for the checks
    let user = await User.findOne({where:{email: req.body.email} });
    if (!user) {
      return res.send({
        success: false,
        message: "user does not exist",
      });
    }

    //after user e.helpxistence true and email exists in the first statement and checking if imputed password matches
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.send({
        success: false,
        message: "invalid password",
      });
    }

    //Generate token
    const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
      expiresIn: "1d",
    });
    res.send({
      success: false,
      message: "User logged in succesfully",
      data: token,
    });
  } catch (error) {
    res.send({
        message: error.message,
        success: false,
    })
  }
// });
}

module.exports= {register, login};