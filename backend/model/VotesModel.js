const mongoose = require('mongoose')

const Votes = new mongoose.Schema({
  itemName: {
    type: String,
    required:true
  },
  email: {
    type:String,
    required:true
  }

},  {
    timestamps: true
    }
)

module.exports = mongoose.model('Votes', Votes)
