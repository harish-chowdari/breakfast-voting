const jwt = require("jsonwebtoken")


const userDetails = require("../model/UserModel")


async function signUp(req,res) {

    try{

    let check = await userDetails.findOne({email:req.body.email})

    // checking, if the user already exist
    if(check){
        return res.json("user already exist")
    } 

    const {password, cnfmpassword } = req.body;

    // checking, if the password and cnfmpasswords are matching
    if (password !== cnfmpassword) {
        return res.json("Passwords are not matched");
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

        // if all the above conditions are satisfied then the token will be generated
        return res.status(200).json({success:true,token})
    }

    catch(error) 
        {
            console.log(error)
            return res.status(500).json("Internal server error")
        }

}


async function logIn(req,res) {

    try {

    let user = await userDetails.findOne({email:req.body.email})

    // checking if the user is already exist
    if(user)
    {
      const passCompare = req.body.password  === user.password 

        // checking, if the password entered by the user and the password saved in database is correct
        if(passCompare)
        {
            const data = {
                user :{ 
                    id:user.id
                }
            }
            const token = jwt.sign(data, "jwtSecret")

            // if password is true then the jwt token will be created
            return res.status(200).json({success:true,token})
        }

        else
        {
            return res.status(200).json("wrong password")
        }
    }

    else
    {
        return res.status(200).json("please signup user not exist")
    }
         
  }

    catch(error) 
        {
            console.log(error)
            return res.status(500).json({ error: "Internal server error" })
        }

}


async function getUsers(req,res) {

    try{
        const data = await userDetails.find({},{email:1, name:1, _id:0})
        return res.status(200).json(data)
    }

    catch(error) 
    {
        console.log(error)
        return res.status(500).json({ error: "Internal server error" })
    }
    
}



module.exports={
    signUp,
    logIn,
    getUsers
}