const express = require('express');
const router = express.Router();
const accessControl = require('../middleware/auth');
const {getCustomers, createCustomer, deleteCustomer, updateCustomer}=require('../controllers/customers');


router.get('/customers', accessControl, getCustomers);
router.post('/customers', createCustomer);
router.delete('/customers/:id',deleteCustomer);
router.put('/update-customer', updateCustomer);
  
  
  module.exports = router;