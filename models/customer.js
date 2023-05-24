const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: false,
  },
  bills: [
    {
      amount: {
        type: Number,
        required: true,
        default: 0,
      },
      user: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('Customer', customerSchema);
