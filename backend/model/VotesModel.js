const mongoose = require('mongoose');

const Votes = new mongoose.Schema({
  vote: {
    type: Number
  },
  email: {
    type:String,
    required:true,
    unique:true
  }
 
});

module.exports = mongoose.model('Votes', Votes);
