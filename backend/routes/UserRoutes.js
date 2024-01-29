const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")


const userDetails = require("../model/UserModel")



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



 
module.exports=router