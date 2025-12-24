const mongoose = require('mongoose')
exports.DbConnect = async()=>{
    try {
        mongoose.connect(process.env.DB_URL).then((data)=>{
            console.log("database connected successfully")
        })
    } catch (error) {
        console.log("mongo error",error.message)
    }
}