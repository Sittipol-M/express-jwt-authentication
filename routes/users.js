const router = require("express").Router()
const controller = require("../controllers/users")

router.get("/", controller.getUsers)

module.exports = { usersRouter: router }