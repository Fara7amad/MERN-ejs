const User = require('../models/user');
const Customer=require("../models/customer")
const bcrypt = require('bcrypt');

/**
 * Creting New User
 * @param {String} name The name of the new user
 * @param {String} email New user's email
 * @param {String} password New user's password
 * @param {String} company The user's company
 * @param {Object} res Send a message whether the process success or fail
 * @returns 
 */
const createUser=async (name,email,password,company,res) => {
    try {
  
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
      res.render("login",{ error: 'User created successfully' });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

/**
 *  Filtering customers according to the logged user 
 * @param {Object} user Holds the logged in user info 
 * @returns Filtered customers
 */
  const findCustomers = async (user) => {
    try {
      const users= await User.find({company:user.company})
      const customerQuery = { 'bills.user': { $in: users.map(user => user.name) } };
      const customers = await Customer.find(customerQuery);
      return customers;
    } catch (error) {
      console.error('Error finding user:', error);
      throw error;
    }
  };

  /**
   * Finding a user in database
   * @param {String} email The user's email to be searched by
   * @returns User's info if found, undefined if not.
   */
  const findUser = async (email)=>{
    const user=User.findOne({ email });
    return user;
  }

  module.exports={createUser,findCustomers,findUser};