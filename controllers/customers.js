const customer = require('../models/customer');
const validateInputs=require('../middleware/validateInputs');
const { findCustomers } = require('./users');

/**
 * Getting customers page 
 * @param {Object} req Holds the session 
 * @param {Object} res Rendering cutomers page and passing filtered customers 
 */
  const getCustomers = async (req, res) => {
    const user = req.session.user; 
    const customers = req.customers; 
    res.render('customers', { customers:customers,user });
  }
  
  /**
   * Create New Customer In Database
   * @param {Object} req Holds the customer details to be created 
   * @param {Object} res Send a message whether the process success or fail
   */
  const createCustomer=async (req, res)=>{
  const { name, email, phone, address,bills } = req.body;
  const {validEmail,validName,validPhone,validAddress, validBills}=validateInputs(email, name, false , phone, address, bills);
  const find =(await findCustomers( {email:email} ));
  if(validEmail && validName && validPhone && validAddress && validBills && !(Object.keys(find).length) ){
  const user = req.session.user.name;

  const newCustomer = new customer({
    name,
    email,
    phone,
    address,
    bills: [{ amount: bills.toString(), user }]
  });
  
  newCustomer.save()
    .then(() => {
      res.status(201).send('Customer added successfully');
    })
    .catch((error) => {
      res.status(500).send('Error adding customer');
    });
}
else res.status(500).send('Error adding customer');
  }

/**
 * Delete a customer from database
 * @param {Object} req To get the cutomer id from URL
 * @param {Object} res Send a message whether the process success or fail
 */
  const deleteCustomer= async(req,res) =>{
    try {
      const customerId = req.params.id;
      await customer.findByIdAndRemove(customerId);
      return res.json({ success: true });
    } catch (error) {
      console.error('Error deleting customer:', error);
      return res.json({ success: false });
    }
  }


  /**
   * Update customer details in database
   * @param {Object} req Holds the customer data to be updated
   * @param {Object} res Send a message whether the process success or fail
   */
  const updateCustomer = async (req,res) =>{
    const { _id ,name, email, phone, address,bills } = req.body;
  const {validEmail,validName,validPhone,validAddress,validBills}=validateInputs(email, name, false , phone, address,bills);
  if(validEmail && validName && validPhone && validAddress && validBills ){
  const user = req.session.user.name;

    customer.findOneAndUpdate(
      {_id: _id}, 
      { name, email, phone, address, bills: [{ amount: bills.toString(), user }] },
      { new: true }
    )
      .then(updatedCustomer => {
        if (updatedCustomer) {
          res.json({ success: true });
        } else {
          res.status(404);
        }
      })
      .catch(error => {
        console.error(error);
        res.sendStatus(500);
      });
  }

}
  module.exports={getCustomers,createCustomer, deleteCustomer, updateCustomer};