const mongoose = require('mongoose')

const bfListSchema = mongoose.Schema({
  id: {
    type: Number,
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