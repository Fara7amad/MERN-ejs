const  validateInputs  = require('../middleware/validateInputs');
const { createUser, findUser } = require('./users');
const bcrypt=require('bcrypt')

/**
 *  Getting signup page
 * @param {object} req 
 * @param {object} res Renders signup page 
 */
const getSignup=async(req,res)=>{
  res.render('signup',{error:false});
}

/**
 * Creating user process
 * @param {JSON Object} req  Holds the signup inputs values 
 * @param {Object} res Renders login page if success, signup page if fail
 */
const postSignup=async(req,res)=>{
  const {  name, email, password, company} = req.body;
  if(!req.body){res.render('signup',{error:false});}
  const user = await findUser(email);
  if (user) {return res.render('login',{error:'User exists! '});}
  const {validEmail,validName,validPass, validCompany}=validateInputs(email,name,password,company);
  if(validEmail && validName && validPass && validCompany){

    createUser(name,email,password,company,res);
    res.redirect("/");
  }
  else{
     res.render('signup', { error: { name: !validName, email: !validEmail, password: !validPass, company:!validCompany } });
  }
  
}

/**
 * Getting Login page
 * @param {Object} req Might hold the session
 * @param {Object} res Renders login if not logged in already, if logged it redirects the user to customers page
 */
const getLogggin = async (req, res) => {
  if(req.session.user){
    res.redirect("/customers");
  }else
  res.render('login',{error:false});
}

/**
 * Auth process
 * @param {JSON Object} req Holds the loggin input values 
 * @param {Object} res Renders  customer page if success, if not it renders the login page again showing error message 
 */
const postLoggin = async (req, res) => {
  const { email, pass } = req.body;
  const {validEmail,validPass}=validateInputs(email,false,pass);
  if(validEmail && validPass){
  try {
    // Find the user by email
    const user = await findUser(email);

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
}else{
  return res.render('login',{error:'something went wrong, \nplease check from your input format'});
}
  };

  /**
   *  Log out
   * @param {Object} req Holds the session
   * @param {Object} res Redirects to login page 
   */
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