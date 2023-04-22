require('dotenv').config()

const express = require('express')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)

const notesRouter = require("./controllers/notes");

// const taskerRouter = require("./controllers/tasks");
// const usersRouter = require("./controllers/users");
// above two lines will be for the routers to each of our controllers .js files

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

app.use('/api', notesRouter)
// code to app.use routers and any middleware

app.listen(port, () => {
    console.log('Server started on port: ' + port)
})
