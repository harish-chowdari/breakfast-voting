const mongoose = require('mongoose');

const Votes = new mongoose.Schema({
  vote: {
    type: Number,
    required: true
  },
  email: {
    type:String,
    required:true,
    unique:true
  }
 
});

module.exports = mongoose.model('Votes', Votes);
