const { secretKey } = require("../configs/jwt");
const { ForbidderError } = require("../errors/errors");
const jwt = require("jsonwebtoken")

const checkAuth = (req, res, next) => {
    const accessToken = req.headers.authorization
    if (!accessToken) throw new ForbidderError({ message: "access token not found" })
    let decoded
    try {
        decoded = jwt.verify(accessToken, secretKey)
    } catch (error) {
        throw new ForbidderError({ message: "invalid access token" })
    }
    req.user = decoded
    next()
}

module.exports = { checkAuth }