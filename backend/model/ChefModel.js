const mongoose = require("mongoose")

const ChefModel = mongoose.Schema({
    comment:{
        type:String,
        required:true
    } 
})

module.exports = mongoose.model("ChefModel",ChefModel)