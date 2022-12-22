const express = require('express')
const routes = express.Router()

const UserController = require('./controllers/UserController')

routes.get("/users", UserController.index)
routes.post("/users", UserController.store)
routes.post("/post", UserController.createPost)
routes.get("/posts", UserController.listPost)
routes.get("/post/:id", UserController.postAuth)
routes.post("/login", UserController.login)
routes.post("/user", UserController.user)
routes.post("/forgot_password", UserController.forgotPassword)
routes.put("/user/:id", UserController.update)
routes.delete("/user/:id", UserController.delete)

module.exports = routes 