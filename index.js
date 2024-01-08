const express = require('express')
const app = express()
const port = 3000
const { handleErrors } = require("./middlewares/handleErrors")
const bodyParser = require("body-parser")
const { authenticationRouter } = require("./routes/authentication")
const { usersRouter } = require('./routes/users')
const { checkAuth } = require('./middlewares/checkAuth')

app.use(bodyParser.json())
app.use("/auth", authenticationRouter)
app.use("/users", checkAuth, usersRouter)

app.use(handleErrors)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})