const express = require('express')
const routes = express()
const todoController = require("../controller/todoController")

routes.get("/",todoController.fetchTodo);
routes.post("/",todoController.createTodo);
routes.delete("/:id",todoController.deleteTodo);
routes.put("/:id",todoController.updateTodo);

module.exports = routes