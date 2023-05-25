const { findCustomers } = require('../controllers/users');
const validateInputs = require('./validateInputs');

/**
 * Filters the customers according to the logged user's company
 * @param {Object} req Holds the session and used to save filtered customers
 * @param {Object} res 
 * @param {*} next  
 */
const accessControl = async (req, res, next) => {
const user = req.session.user;
if (user){
const {validEmail,validName,validPass,validCompany}=validateInputs(user.email, user.name, user.password, user.company);
if(validEmail && validName && validPass && validCompany){
  try {
    if (user) {
      const customers = await findCustomers( user );
      req.customers = customers;
    }
    next();
  } catch (error) {
    console.error('Error filtering customers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
    next();
  }
   else {
    res.redirect('/');
  }}
  else{
    res.redirect('/');
  }
};


module.exports = accessControl;
