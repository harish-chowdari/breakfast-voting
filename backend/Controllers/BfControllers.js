const bfList = require("../model/bfModel")

const moment=require("moment")
const port=2008

function uploadImage(req,res) {
    return res.status(200).json({
        success:true,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
}


 async function postItem(req, res) {
    
    try {
        
    const currentTime = new Date()
    const currentHour = currentTime.getHours()
    const currentMinutes = currentTime.getMinutes()
    
    // if we are trying to add the item between the time period then this block will execute
    if (currentHour === 20 && currentMinutes <= 59) {
        const currentDate = moment().startOf('day')


        const exist = await bfList.findOne({
            itemName: req.body.itemName.toLowerCase().trim(),
            createdAt: { $gte: currentDate.toDate(), $lt: moment(currentDate).endOf('day').toDate() }
        })
 
        if(exist) {
            return res.json("Can't add duplicate item for the current day.")
        }

        const itemCountToday = await bfList.countDocuments({
            createdAt: { $gte: currentDate.toDate(), $lt: moment(currentDate).endOf('day').toDate() }
        })

        if(itemCountToday > 9) 
        {
            return res.json("Cannot add more than 10 items for the current day, limit reached.")
        }

        let products = await bfList.find({})
        let id

        if (products.length > 0) {
            let all_prod_array = products.slice(-1)
            let prod = all_prod_array[0]
            id = prod.id + 1
        } else {
            id = 1
        }

        const list = new bfList({
            id: id,
            email:req.body.email,
            itemName: req.body.itemName.toLowerCase().trim(),
            image: req.body.image,
        })

        console.log(list,currentDate.toDate())
        await list.save()

        return res.status(200).json(req.body.itemName)
    } 
    
    // if we are trying to add the item after the time period then else block will execute
    else {
        return res.json("Cannot add the item before 11 or after 11")
    }
 }

 catch(error) 
 {
     console.error(error);
     return res.status(500).json({ error: 'Internal server error' });
 }
}



async function getCount(req,res) {
    try
    {
        const currentDate = moment().startOf('day')

        const count = await bfList.countDocuments({
            createdAt: { $gte: currentDate.toDate(), $lt: moment(currentDate).endOf('day').toDate() }
        })    
        return res.status(200).json({count})
    }

    catch(error) 
    {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


async function getItems(req, res) {
    try
    {
        const currentDate = moment().startOf('day')

        const data = await bfList.find({
            
            createdAt: { 
                $gte: currentDate.toDate(), 
                $lt: moment(currentDate).endOf('day').toDate() 
            }, 
        },

        { itemName: 1, image: 1, _id: 0 }

        )

        return res.status(200).json(data)
    } 

    catch(error) 
    {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}



module.exports = {
    uploadImage,
    postItem,
    getCount,
    getItems

}