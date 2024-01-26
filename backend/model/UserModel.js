const mongoose = require('mongoose');

const userDetails = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }, 
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  cnfmpassword: {
    type: String,
    required: true
  }
},
  {
    timestamp:true
  }
)
;

module.exports = mongoose.model('UserDetails', userDetails);
