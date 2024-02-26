const mongoose = require('mongoose')

const bfListSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  }

},  {
    timestamps: true
    }
)

module.exports = mongoose.model('bfList', bfListSchema)