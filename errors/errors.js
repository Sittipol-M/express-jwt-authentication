class ValidationError {
    constructor({ message }) {
        this.message = message
        this.httpStatus = 400
    }
}

class UnauthorizedError {
    constructor({ message }) {
        this.message = message
        this.httpStatus = 401
    }
}

class ForbidderError {
    constructor({ message }) {
        this.message = message
        this.httpStatus = 403
    }
}

module.exports = { ValidationError, UnauthorizedError, ForbidderError }