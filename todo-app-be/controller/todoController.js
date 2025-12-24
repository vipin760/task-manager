const TodoModel = require("../model/todo.model");

exports.createTodo = async (req, res) => {
    try {
        const { title, description, status } = req.body
        if(!title) return res.status(400).send({status:false,message:"please enter valid title"})
        const saveTodo = new TodoModel({ title, description,status })
        const response = await saveTodo.save()
        if (response) {
            return res.status(200).send({ status: true, data: response })
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: "internal server down" });
    }
}

exports.fetchTodo = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit
        const fetchData = await TodoModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit)
        const count = await TodoModel.countDocuments()
        const totalPages = Math.ceil(count / limit)
        res.status(200).send({ status: true, data: fetchData, pagination: { total: count, page, totalPages, limit } });
    } catch (error) {
        return res.status(500).send({ status: false, message: "internal server down" });
    }
}

exports.updateTodo = async (req, res) => {
    try {
        const response = await TodoModel.findByIdAndUpdate(req.params.id, req.body)
        return res.status(200).send({ status: true, data: response, message: "updated successfully" })
    } catch (error) {
        return res.status(500).send({ status: false, message: "internal server down" });
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        const response = await TodoModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({ status: true, data: response, message: "deleted successfully" })
    } catch (error) {
        return res.status(500).send({ status: false, message: "internal server down" });
    }
}

exports.getByIdTodo = async (req, res) => {
    try {

    } catch (error) {
        return res.status(500).send({ status: false, message: "internal server down" });
    }
}