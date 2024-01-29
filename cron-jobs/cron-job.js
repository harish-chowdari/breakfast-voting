const cron = require("node-cron")

cron.schedule("10,29,30,39 * * * * *", ()=>{
    console.log("running every second")
})