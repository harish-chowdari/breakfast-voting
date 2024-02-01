
const express = require("express")
const router = express.Router()

const voteController = require("../Controllers/VotesControllers")
const cron = require('node-cron')


router.post("/vote", voteController.addVote)

router.get('/getvotescount', voteController.voteCount)

// This function will run based on the time which I have mentioned
cron.schedule("0 10 16 * * *", voteController.cronJob)

router.get("/getwinner", voteController.getWinner)


module.exports=router
