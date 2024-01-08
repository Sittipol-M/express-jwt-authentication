const users = require("../db/users")

const getUsersData = () => {
    return users.mockData
}

module.exports = { getUsersData }