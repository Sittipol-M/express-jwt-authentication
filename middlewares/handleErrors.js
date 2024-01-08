const { ValidationError, UnauthorizedError, ForbidderError } = require("../errors/errors")

const handleErrors = (error, req, res, next) => {
    if (error) {
        if (error instanceof ValidationError) {
            return res.status(error.httpStatus).send({ message: error.message })
        }
        else if (error instanceof UnauthorizedError) {
            return res.status(error.httpStatus).send({ message: error.message })
        }
        else if (error instanceof ForbidderError) {
            return res.status(error.httpStatus).send({ message: error.message })
        }
        return res.status(500).send({ message: error?.message })
    }
    next()
}

module.exports = { handleErrors }