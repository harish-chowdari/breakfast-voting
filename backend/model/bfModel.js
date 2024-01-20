const mongoose = require("mongoose")

const bfList = mongoose.Schema({
    itemName:{
        type:String,
        required:true
    } ,   

    image:{
        type:String
    }
})

module.exports = mongoose.model("bfList",bfList)