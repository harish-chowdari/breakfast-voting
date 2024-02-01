const mongoose = require("mongoose")

const userDetails = require("../model/UserModel")
const bfList = require("../model/bfModel")
const Votes=require("../model/VotesModel")



const moment = require('moment')

// This is the function to add your vote
async function addVote(req, res) {
    try {
        const currentDate = moment().startOf('day');

        const userVotedToday = await Votes.findOne({
            email: req.body.email,
            date: { $gte: currentDate.toDate(), $lt: moment(currentDate).endOf('day').toDate() }
        })

        //checking, if the user has already been voted today
        if (userVotedToday) {
            return res.status(409).json("Already voted today")
        }  

        const userExist = await userDetails.findOne({ email: req.body.email })

        const itemExist = await bfList.findOne({
            itemName: req.body.itemName.toLowerCase().trim(),
            date: { $gte: currentDate.toDate(), $lt: moment(currentDate).endOf('day').toDate() }
        })

        // if the user does not exist then he needs to signup first
        if(!userExist)
        {
            return res.status(200).json("please sign up first")
        }

        // checking, if the item is exist to vote
        else if(itemExist) 
        {
            const vote = new Votes({
                email: req.body.email,
                itemName: req.body.itemName
            })

            const savedVote = await vote.save()

            return res.status(200).json({ savedVote })
        }
        else
        {
            return res.status(400).json("item does not exist")

        }

    } 
    
    catch (error) 
    {
        console.log(error)
        return res.status(500).json({ error: "Internal server error" })
    }
}


// With this function we can get the counts of current date votes
async function voteCount(req, res) {
    try {
        const currentDate = moment().startOf('day')
        
        const votesCount = await Votes.aggregate([
            { $match: { createdAt: { $gte: currentDate.toDate(),
                $lt: moment(currentDate).endOf('day').toDate() } } },
            { $group: { _id: "$itemName", count: { $sum: 1 } } }
        ])

        const votesCountObject = {};
        votesCount.forEach(item => {
            votesCountObject[item._id] = item.count;
        })

        // getting the current date votes
        return res.status(200).json(votesCountObject);
    } 
    
    catch(error) 
    {
        console.error("Error retrieving votes count:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


// here this function will run with the help of cron schedule method
async function cronJob(req, res) {

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
        return res.status(200).json(winningItem)
        
    } 
    
    catch(error) 
    {
        console.log(error)
        return res.status(500).json({ error: "Internal server error" })
    }
}


const Winner = mongoose.model('Winner', {
    winner: String,
    date: Date
}) 


async function getWinner(req, res) {
    try {
        const currentDate = moment().startOf('day')

        const winner = await Winner.findOne({
            date: { $gte: currentDate.toDate(), 
                $lt: moment(currentDate).endOf('day').toDate() }
        }, 'winner')

        if(winner) 
        {
            return res.status(200).json({winner : winner.winner})
        } 

        else  
        {
            console.log("No winner found")
            return res.status(200).json("winner not found")
        }
    } 
    
    catch(error) 
    {
        console.log(error)
        return res.status(500).json({ error: "Internal server error" })
    }
}




module.exports = {
    addVote,
    voteCount,
    cronJob,
    getWinner
    
}