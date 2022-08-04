//require('dotenv').config()
const port = 3000

const express = require('express')
const server = express()

const client = require('./db/client')

const morgan = require('morgan')
server.use(morgan('dev'))

// const cors = require('cors')
// server.use(cors())

const bodyParser = require('body-parser')
server.use(bodyParser.json())

const { apiRouter } = require('./api')
server.use('/api', apiRouter)

server.listen(process.env.PORT || port, () => {
    console.log(`Client is connected on port ${process.env.PORT || port}... Hmmm`)
    client.connect()
})