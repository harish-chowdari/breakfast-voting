const mongoose = require("mongoose")

const ChefModel = mongoose.Schema({
    itemName:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
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

module.exports = mongoose.model("ChefModel",ChefModel)