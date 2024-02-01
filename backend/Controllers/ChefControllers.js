const bfList = require("../model/bfModel")

const ChefModel = require("../model/ChefModel")
const moment = require('moment')


async function postComments(req,res) {

    try {

    const currentDate = moment().startOf('day')

    const itemExist = await bfList.findOne({
        itemName: req.body.itemName.toLowerCase().trim(),
        date: { $gte: currentDate.toDate(), $lt: moment(currentDate).endOf('day').toDate() }
    })

    // checking, if the itemName is not exist on the current day, then it will show item not exist
    if(!itemExist)
    {
        return res.status(200).json("Item does not exist");
    }

    const commentExist = await ChefModel.findOne({
        itemName: req.body.itemName.toLowerCase().trim(),
        createdAt: { $gte: currentDate.toDate(), $lt: moment(currentDate).endOf('day').toDate() }
    })

    // checking, if the comment has been added for the item on current date
    if(commentExist)
    {
       return res.status(200).json("already commented") 
    }

        const d = new ChefModel({
            itemName:req.body.itemName,
            comment:req.body.comment,
            date: new Date()

        })
        const data = await d.save()
        return res.status(200).json(data)   
    }

    catch(error) 
    {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }

}



async function getComments(req, res) {
    try 
    {
        const currentDate = moment().startOf('day')
        const endOfDay = moment().endOf('day')

        const data = await ChefModel.find({
            createdAt: {
                $gte: currentDate.toDate(), 
                $lt: endOfDay.toDate() 
            }
        })

        // getting comments on current date

        return res.status(200).json(data)
    } 
    
    catch(error) 
    {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



module.exports = {
    postComments,
    getComments

}