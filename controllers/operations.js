const customer = require('../models/customer');
const User = require('../models/user');
const Customer=require("../models/customer")
const bcrypt = require('bcrypt');

const createUser=async (name,email,password,company,res) => {
    try {
    //   const { name, email, password, company } = req.body;
  
      // Check if a user with the same email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.render('signup',{ error: 'Email already exists' });
      }
  
      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user instance
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        company,
      });
  
      // Save the user to the database
      await newUser.save();
  console.log("User created successfully")
      res.render("login",{ error: 'User created successfully' });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }


  const findCustomers = async (user) => {
    try {
      // console.log("find",user)
      const users= await User.find({company:user.company})
      const customerQuery = { 'bills.user': { $in: users.map(user => user.name) } };
const customers = await Customer.find(customerQuery);
      return customers;
    } catch (error) {
      console.error('Error finding user:', error);
      throw error;
    }
  };

  const findUser = async (email)=>{
    const user=User.findOne({ email });
    return user;
  }
  module.exports={createUser,findCustomers,findUser};