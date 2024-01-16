const service = require("../services/authentication")

const login = async (req, res, next) => {
    try {
        const { accessToken } = await service.login(req.body)
        res.status(200).send({ message: "login successful", accessToken })
    } catch (error) {
        next(error)
    }
}

const register = async (req, res, next) => {
    try {
        await service.register(req.body)
        res.status(200).send({ message: "register successful" })
    } catch (error) {
        next(error)
    }
}

const refreshAccessToken = (req, res, next) => {
    try {
        const accessToken = service.refreshAccessToken(req.body)
        res.status(200).send({ accessToken })
    } catch (error) {
        next(error)
    }
}

module.exports = { login, register, refreshAccessToken }