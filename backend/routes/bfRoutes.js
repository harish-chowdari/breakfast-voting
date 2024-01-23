const express = require("express")
const router = express.Router()
const moment=require("moment")
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


    
router.post("/addbreakfast", async (req, res) => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();

    if (currentHour === 17 && currentMinutes <= 59) {
        const currentDate = moment().startOf('day');

        const itemNameRegex = new RegExp("^" + req.body.itemName + "$", "i");

        const exist = await bfList.findOne({
            itemName: itemNameRegex,
            date: { $gte: currentDate.toDate(), $lt: moment(currentDate).endOf('day').toDate() }
        });

        if (exist) {
            return res.json({
                success: false,
                message: "Can't add duplicate item for the current day."
            });
        }

        const itemCountToday = await bfList.countDocuments({
            date: { $gte: currentDate.toDate(), $lt: moment(currentDate).endOf('day').toDate() }
        });

        if (itemCountToday > 9) {
            return res.json({
                success: false,
                message: "Cannot add more items for the current day, limit reached."
            });
        }

        let products = await bfList.find({});
        let id;

        if (products.length > 0) {
            let all_prod_array = products.slice(-1);
            let prod = all_prod_array[0];
            id = prod.id + 1;
        } else {
            id = 1;
        }

        const list = new bfList({
            id: id,
            itemName: req.body.itemName,
            image: req.body.image,
            date: currentDate.toDate()
        });

        console.log(list,currentDate.toDate());
        await list.save();
        res.json({
            success: true,
            itemName: req.body.itemName
        });
    } else {
        res.json("Cannot add the item before 16 or after 16");
    }
});

 


router.get("/getBreakfastByTimestamp", async (req, res) => {
    try {
        const currentDate = moment().startOf('day')

        const data = await bfList.find({
            date: { $gte: currentDate.toDate(), $lt: moment(currentDate).endOf('day').toDate() }
        })

        res.json(data)
    } catch (error) {
        console.error("Error fetching breakfast items by timestamp:", error)
        res.status(500).json({ success: false, message: "Failed to fetch breakfast items" })
    }
})










module.exports=router