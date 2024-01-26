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
  },
  date: {
    type: String,
    default: Date.now,
  },
  time: {
    type: String,
    default: () => {
      const currentTime = new Date();
      const options = { hour: '2-digit', 
      minute: '2-digit', second: '2-digit', hour12: false }
      return currentTime.toLocaleTimeString('en-US', options)
    },
  },

},  {
    timestamps: true
    }
)

module.exports = mongoose.model('bfList', bfListSchema)