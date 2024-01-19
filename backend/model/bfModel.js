const mongoose = require("mongoose")

const bfList = mongoose.Schema({
    itemName:{
        type:String,
        required:true
    } ,  

    image:{
        type:String
    },
  votes: {
    type: Number,
    default: 0, // Initial vote count is set to 0
  },
})

module.exports = mongoose.model("bfList",bfList)