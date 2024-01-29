
const express = require("express")
const router = express.Router()
const Votes=require("../model/VotesModel")
const userDetails = require("../model/UserModel")
const bfList = require("../model/bfModel")
const cron = require('node-cron');
const mongoose = require('mongoose');

const moment = require('moment')


router.post("/vote", async (req, res) => {
    try {
        const currentDate = moment().startOf('day');

        const userVotedToday = await Votes.findOne({
            email: req.body.email,
            date: { $gte: currentDate.toDate(), $lt: moment(currentDate).endOf('day').toDate() }
        })

        if (userVotedToday) {
            return res.json("Already voted today")
        }  

        const userExist = await userDetails.findOne({ email: req.body.email })

        const itemExist = await bfList.findOne({
            itemName: req.body.itemName.toLowerCase().trim(),
            date: { $gte: currentDate.toDate(), $lt: moment(currentDate).endOf('day').toDate() }
        })

        if(!userExist)
        {
            res.json("please sign up first")
        }

        else if (itemExist) 
        {
            const vote = new Votes({
                email: req.body.email,
                itemName: req.body.itemName
            })

            const savedVote = await vote.save()

            return res.json({ savedVote })
        }
        else
        {
            return res.json("item does not exist")

        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal server error" })
    }
})



router.get('/getvotescount', async (req, res) => {
    try {
        const currentDate = moment().startOf('day')// Define currentDate here
        
        const votesCount = await Votes.aggregate([
            { $match: { createdAt: { $gte: currentDate.toDate(),
                $lt: moment(currentDate).endOf('day').toDate() } } },
            { $group: { _id: "$itemName", count: { $sum: 1 } } }
        ])

        const votesCountObject = {};
        votesCount.forEach(item => {
            votesCountObject[item._id] = item.count;
        })

        res.json(votesCountObject);
    } catch (error) {
        console.error("Error retrieving votes count:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

const Winner = mongoose.model('Winner', {
    winner: String,
    date: Date
}) 


cron.schedule("0 57 10 * * *", async (req, res) => {
    try {
        const currentDate = moment().startOf('day')
        
        const votesCount = await Votes.aggregate([
            { $match: { createdAt: { $gte: currentDate.toDate(), 
                $lt: moment(currentDate).endOf('day').toDate() } } },
            { $group: { _id: "$itemName", count: { $sum: 1 } } }
        ]) 

        let maxCount = 0
        let winningItem = ""

        votesCount.forEach(item => {
            if (item.count > maxCount) {
                maxCount = item.count;
                winningItem = item._id;
            }
        })

        const winner = new Winner({
            winner: winningItem,
            date: new Date()
        })

        await winner.save()

        console.log("winner is :", winningItem)
    } catch (error) {
        console.log("Error retrieving winner:", error)
    }
})


router.get("/getwinner", async (req, res) => {
    try {
        const currentDate = moment().startOf('day')

        const winner = await Winner.findOne({
            date: { $gte: currentDate.toDate(), 
                $lt: moment(currentDate).endOf('day').toDate() }
        }, 'winner')

        if(winner) 
        {
            res.json({winner : winner.winner})
        } 

        else  
        {
            console.log("No winner found")
        }
    } 
    
    catch(error) 
    {
        console.log("Error fetching winner:", error);
        res.json({ error: "Internal server error" });
    }
})







 
module.exports=router
