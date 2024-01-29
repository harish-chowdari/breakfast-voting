const express = require("express")
const router = express.Router()

const bfList = require("../model/bfModel")

const ChefModel = require("../model/ChefModel")
const moment = require('moment')


router.post("/chefcomment", async(req,res)=>{
    const currentDate = moment().startOf('day');

    const itemExist = await bfList.findOne({
        itemName: req.body.itemName.toLowerCase().trim(),
        date: { $gte: currentDate.toDate(), $lt: moment(currentDate).endOf('day').toDate() }
    })

    if(!itemExist)
    {
        return res.json("Item does not exist");
    }

    const commentExist = await ChefModel.findOne({
        itemName: req.body.itemName.toLowerCase().trim(),
        createdAt: { $gte: currentDate.toDate(), $lt: moment(currentDate).endOf('day').toDate() }
    })

    if(commentExist)
    {
       return res.json("already commented") 
    }

        const d = new ChefModel({
            itemName:req.body.itemName,
            comment:req.body.comment,
            date: new Date() // Assuming you want to save the current date with the comment

        })
        const data = await d.save()
        res.json(data)   
    
})

router.get("/getcomments", async(req,res)=>{
    const data = await ChefModel.find()
    res.json(data)
})

module.exports=router