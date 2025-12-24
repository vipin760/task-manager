require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors')

const todoRoutes = require("./routes/todoRoutes")
const { DbConnect } = require("./config/dbConnect")
DbConnect()
app.use(cors());
app.use(express.json())

app.use("/todo",todoRoutes);

app.listen(PORT,()=>{
    console.log("running on port",PORT)
})
