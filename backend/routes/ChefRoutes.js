const express = require("express")
const router = express.Router()


const ChefModel = require("../model/ChefModel")


router.post("/addcomment", async(req,res)=>{

    const d = new ChefModel({
        comment:req.body.comment
    })
    const data = await d.save()
    res.json(data)
})

module.exports=router