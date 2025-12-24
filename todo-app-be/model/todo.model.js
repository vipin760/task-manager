const mongoose = require("mongoose")
const todoSchema = mongoose.Schema({
    title: { type: String, require: true },
    description: { type: String },
    status: {
        type: String, 
        enum: ["PENDING", "IN_PROGRESS", "COMPLETED"],
        default: "PENDING"
    }
}, {
    timestamps: true
})

const TodoModel = mongoose.model("Todo", todoSchema)
module.exports = TodoModel 