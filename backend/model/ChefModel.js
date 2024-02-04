const mongoose = require("mongoose")

const ChefModel = mongoose.Schema({
    itemName:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    } 
    
    },  
    
      {
        timestamps: true
    }
)

module.exports = mongoose.model("ChefModel",ChefModel)