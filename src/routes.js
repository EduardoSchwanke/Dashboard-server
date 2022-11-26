const express = require('express')
const routes = express.Router()

const UserController = require('./controllers/UserController')

routes.get("/users", UserController.index)
routes.post("/users", UserController.store)
routes.post("/login", UserController.login)
routes.post("/user", UserController.user)
routes.post("/forgot_password", UserController.forgotPassword)

module.exports = routes 