const  validateInputs  = require('../middleware/validateInputs');
const { createUser, findUser } = require('./operations');
const bcrypt=require('bcrypt')

// var session;


const getSignup=async(req,res)=>{
  res.render('signup',{error:false});
}

const postSignup=async(req,res)=>{
  const {  name, email, password, company} = req.body;
  if(!req.body){res.render('signup',{error:false});}
  const {validEmail,validName,validPass}=validateInputs(email,name,password);
  if(validEmail && validName && validPass){
    createUser(name,email,password,company,res);
  }
  else{
    if (!validName) { return res.render('signup', { error: { name: !validName, email: !validEmail, password: !validPass } });}
  }
  
}

const getLogggin = async (req, res) => {
  if(req.session.user){
    res.redirect("/customers");
  }else
  res.render('login',{error:false});
}


const postLoggin = async (req, res) => {
  const { email, pass } = req.body;
  // console.log(email,pass);
  try {
    // Find the user by email
    const user = await findUser(email);
    // console.log(user)
    
    // Check if the user exists
    if (!user) {return res.render('login',{error:'Invalid email '});}
    
    // Validate the password
    const validPassword = await bcrypt.compare(pass, user.password);
    
    // Check if the password is valid
    if (!validPassword) {return res.render('login',{error:'Invalid password'});}
      req.session.user=user;
      res.redirect('/customers',);
    } catch (error) {
      console.error('Error logging in:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err)
      res.render('customers')
    }
    res.redirect('/')
  })
}
  
  module.exports={getLogggin,postLoggin,getSignup,postSignup,logout};