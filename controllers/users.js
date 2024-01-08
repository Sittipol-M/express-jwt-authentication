const service = require("../services/users")
const getUsers = (req, res, next) => {
    try {
        const users = service.getUsersData()
        res.status(200).send({ users })
    } catch (error) {
        next(error)
    }
}

module.exports = { getUsers }