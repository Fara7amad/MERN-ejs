const { findCustomers } = require('../controllers/users');
const validateInputs = require('./validateInputs');

const accessControl = async (req, res, next) => {
const user = req.session.user;
if (user){
const {validEmail,validName,validPass,validCompany}=validateInputs(user.email, user.name, user.password, user.company);
if(validEmail && validName && validPass && validCompany){
  try {
    if (user) {
      // console.log('user:',user.name);
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
    // res.status(403).json({ error: 'Access denied' });
    res.redirect('/');
  }}
  else{
    res.redirect('/');
  }
};


module.exports = accessControl;
