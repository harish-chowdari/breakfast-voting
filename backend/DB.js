const mongoose = require("mongoose")


module.exports = mongoose.connect(process.env.MONGODB_URI)

const con = mongoose.connection

con.on("error",()=>{
    console.log("error")
})  
 
con.once("open",()=>{
    console.log("db connected")
})  