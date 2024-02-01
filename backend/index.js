const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const jwt = require("jsonwebtoken")

const app = express()
app.use(express.json()) 
app.use(cors()) 

const bfRoutes = require("./routes/bfRoutes")
app.use("/",bfRoutes) 

const userRoutes = require("./routes/UserRoutes")
app.use("/",userRoutes)

const ChefRoutes = require("./routes/ChefRoutes")
app.use("/",ChefRoutes)

const VoteRoutes = require("./routes/VotesRoutes")
app.use("/", VoteRoutes)


process.env.TZ = 'Asia/Kolkata'; // Set to the time zone of your choice

    
  
 

 
mongoose.connect("mongodb+srv://harish:LDPasAv1fBvS38al@cluster0.qgm68yy.mongodb.net/?retryWrites=true&w=majority")
const con = mongoose.connection

con.on("error",()=>{
    console.log("error")
}) 
 
con.once("open",()=>{
    console.log("db connected")
})

 




app.listen(2008,()=>{
    console.log("server running on 2008 port...")
})


