const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()

const app = express()
app.use(express.json()) 
app.use(cors())

const errorHandler = require("./ErrorHandler/ErrorHandler")

const db = require("./DB")

const bfRoutes = require("./routes/bfRoutes")
app.use("/",bfRoutes) 

const userRoutes = require("./routes/UserRoutes")
app.use("/",userRoutes)

const ChefRoutes = require("./routes/ChefRoutes")
app.use("/",ChefRoutes)
 
const VoteRoutes = require("./routes/VotesRoutes")
app.use("/", VoteRoutes)

app.all('*', (req, res, next) => {
    
    const err = new Error(`Can't find ${req.originalUrl} on the server!`, 404);
    next(err);
})

app.use(errorHandler)

const PORT = process.env.PORT || 3008;

app.listen(PORT,()=>{
    console.log(`server running on ${PORT} port...`)
})


