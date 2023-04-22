require('dotenv').config()

const express = require('express')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)


// const taskerRouter = require("./controllers/tasker");
const usersRouter = require("./controllers/users");
const sessionRouter = require("./controllers/sessions")

// above two lines will be for the routers to each of our controllers .js files

//imports middleware
const errorHandlingMiddleware = require("./middlewares/errorHandling");

const db = require('./models')


const app = express()
const port = process.env.HTTP_PORT || 3000

app.use(express.static('client'))
app.use(express.json())
app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        store: new pgSession({
            pool: db,
            createTableIfMissing: true,
        }),
    })
)

// code to app.use routers and any middleware
app.use('/api', usersRouter, sessionRouter)
app.use(errorHandlingMiddleware)


app.listen(port, () => {
    console.log('Server started on port: ' + port)
})
