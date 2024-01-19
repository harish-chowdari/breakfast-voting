const express = require("express")
const router = express.Router()

const multer = require("multer")

const path = require("path")
const port=2008

const bfList = require("../model/bfModel")



const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: function(req,file,cb) {
        cb(null, `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

router.use("/images", express.static("upload/images"))

router.post("/upload", upload.single("product"), (req,res)=>{
    res.json({
        success:1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})


    
router.post("/addbreakfast", async(req,res)=>{
    const list = new bfList({
        itemName:req.body.itemName,
        image:req.body.image
    }) 

    await list.save()
    res.json({
        success:true,
        itemName:req.body.itemName
    })  
})     

router.get("/getBreakfast", async(req,res)=>{
    const data = await bfList.find()
    res.json(data)
}) 






  



module.exports=router