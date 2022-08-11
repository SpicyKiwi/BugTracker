const express = require('express')
const apiRouter = express.Router()


apiRouter.get('/', (req, res, next) => {
    const returnObj = { pulseCheck: "*thump* *thump*"}
    console.log("hello there general kenobi")

    res.send(returnObj)
})

const {usersRouter} = require('./users.js')
apiRouter.use('/users', usersRouter)

const {projectsRouter} = require('./projects.js')
apiRouter.use('/projects', projectsRouter)

apiRouter.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send(err)
})

module.exports = {
    apiRouter
}