const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")

const userDetails = require("../model/UserModel")
const Votes=require("../model/VotesModel")
const bfList = require("../model/bfModel")


router.post("/signup", async(req,res)=>{
    let check = await userDetails.findOne({email:req.body.email})
    if(check){
        return res.json({errors: "user already exist"})
    } 

    const {password, cnfmpassword } = req.body;

    if (password !== cnfmpassword) {
        return res.json({ errors: "Passwords do not match" });
    }   

    let vote = {}
        for (let i=0;i<30;i++)
        {
            vote[i]=0
        }

        const user = new userDetails({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            cnfmpassword:req.body.cnfmpassword,
            voteData:vote
        })

        

        await user.save()

        const data ={
           user :{
            id:user.id
           }
        }

        const token = jwt.sign(data, "jwtSecret")
        res.json({success:true,token})

})



router.post("/login", async(req,res)=>{

    let user = await userDetails.findOne({email:req.body.email})

    if(user){
      const passCompare = req.body.password  === user.password 
        if(passCompare)
        {
            const data = {
                user :{ 
                    id:user.id
                }
            }
            const token = jwt.sign(data, "jwtSecret")
            res.json({success:true,token})
        }
        else{
            res.json({errors:"wrong password"})
        }
    }
    else{
        res.json({errors:"please signup user not exist"})
    }
}) 


router.get("/userdetails", async(req,res)=>{
    const data = await userDetails.find()
    res.json(data)
})   


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

            const itemCounts = await Votes.aggregate([
                { $group: { _id: "$itemName", count: { $sum: 1 } } }
            ])

            return res.json({ savedVote, itemCounts })
        }
        else
        {
            return res.json("item does not exist")

        }

    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Internal server error" })
    }
})



router.get('/getvotescount', async (req, res) => {
    try {
        const currentDate = moment().startOf('day'); // Define currentDate here
        
        const votesCount = await Votes.aggregate([
            { $match: { createdAt: { $gte: currentDate.toDate(),
                $lt: moment(currentDate).endOf('day').toDate() } } },
            { $group: { _id: "$itemName", count: { $sum: 1 } } }
        ]);

        const votesCountObject = {};
        votesCount.forEach(item => {
            votesCountObject[item._id] = item.count;
        });

        res.json(votesCountObject);
    } catch (error) {
        console.error("Error retrieving votes count:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



router.get('/getWinner', async (req, res) => {
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

        res.json({ winner: winningItem })
    } catch (error) {
        console.error("Error retrieving winner:", error)
        res.status(500).json({ error: "Internal server error" })
    }
})





 
module.exports=router