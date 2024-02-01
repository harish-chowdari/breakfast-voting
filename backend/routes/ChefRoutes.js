const express = require("express")
const router = express.Router()

const ChefController = require("../Controllers/ChefControllers")


router.post("/chefcomment", ChefController.postComments)

router.get("/getcomments", ChefController.getComments) 


module.exports=router