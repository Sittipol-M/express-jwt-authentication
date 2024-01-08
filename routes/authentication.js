const router = require("express").Router()
const controller = require("../controllers/authentication")

router.post("/login", controller.login)
router.post("/register", controller.register)
router.post("/refreshAccessToken", controller.refreshAccessToken)


module.exports = { authenticationRouter: router }