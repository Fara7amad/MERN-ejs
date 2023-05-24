const customer = require('../models/customer');
const validateInputs=require('../middleware/validateInputs');
const { findCustomers } = require('./operations');

  const getCustomers = async (req, res) => {
    const user = req.session.user; 
    const customers = req.customers; 
    res.render('customers', { customers:customers,user });
  }
  
  const createCustomer=async (req, res)=>{
  const { name, email, phone, address } = req.body;
  console.log(name,email,phone,address)
  const {validEmail,validName,validPhone,validAddress}=validateInputs(email, name, false ,false, phone, address);
  console.log(validEmail,validName,validPhone,validAddress)
  const find =(await findCustomers( {email:email} ));
  if(validEmail && validName && validPhone && validAddress && !(find.length) ){

  const user = req.session.user.name;

  const newCustomer = new customer({
    name,
    email,
    phone,
    address,
    bills: [{ amount: 0, user }]
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


  const deleteCustomer= async(req,res) =>{
    try {
      const customerId = req.params.id;
      console.log(customerId)
      await customer.findByIdAndRemove(customerId);
      return res.json({ success: true });
    } catch (error) {
      console.error('Error deleting customer:', error);
      return res.json({ success: false });
    }
  }


  const updateCustomer = async (req,res) =>{
    const { _id ,name, email, phone, address } = req.body;
  const {validEmail,validName,validPhone,validAddress}=validateInputs(email, name, false ,false, phone, address);
  if(validEmail && validName && validPhone && validAddress ){
    customer.findOneAndUpdate(
      {_id: _id}, 
      { name, email, phone, address },
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