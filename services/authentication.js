const Joi = require("joi")
const { ValidationError, UnauthorizedError, ForbidderError } = require("../errors/errors")
const users = require("../db/users")
const jwt = require("jsonwebtoken")
const { secretKey } = require("../configs/jwt")

const login = async (bodyRequest) => {
    await validateLoginBodyRequest(bodyRequest)
    const foundUser = users.mockData.find((user) => user.username === bodyRequest.username)
    if (!foundUser) throw new UnauthorizedError({ message: "username not found" })
    const tokens = generateAccessAndRefreshToken({ username: foundUser.username, id: foundUser.id })
    return tokens
}

const generateAccessAndRefreshToken = ({ username, id }) => {
    const accessToken = generateJwtToken({ username, id, expiresIn: "5m" })
    const refreshToken = generateJwtToken({ username, id, expiresIn: "1d" })
    return { accessToken, refreshToken }
}

const validateLoginBodyRequest = async (bodyRequest) => {
    if (!bodyRequest) {
        throw new ValidationError({ message: "body request is required" })
    }
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    })
    try {
        await schema.validateAsync(bodyRequest)
    } catch (error) {
        throw new ValidationError({ message: error?.message })
    }
}

const refreshAccessToken = ({ refreshToken }) => {
    if (!refreshToken) {
        throw new ForbidderError({ message: "refresh token not found" })
    }
    let decoded
    try {
        decoded = jwt.verify(refreshToken, secretKey)
    } catch (error) {
        throw new ForbidderError({ message: "invalid refresh token" })
    }
    const accessToken = generateJwtToken({ username: decoded?.username, id: decoded?.id, expiresIn: "5m" })
    return accessToken
}



const generateJwtToken = ({ username, id, expiresIn }) => {
    return jwt.sign({ username, id }, secretKey, { expiresIn })
}

module.exports = { login, refreshAccessToken }