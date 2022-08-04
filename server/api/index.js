const express = require('express')
const apiRouter = express.Router()

const {
    getUsers,
    createUser
} = require('../db')


apiRouter.get('/', (req, res, next) => {
    const returnObj = { pulseCheck: "It's aliveeee!!"}
    console.log("hello there general kenobi")

    res.send(returnObj)
})

apiRouter.get('/users', async (req, res, next) => {
    try {

        const users = await getUsers()

        res.send(users)
    } catch (error) {
        console.log(error)
    }
})

apiRouter.post('/users', async (req, res, next) => {
    try {

        console.log("Req Body: ", req.body)

        const user = await createUser(req.body)

        res.send(user)
    } catch (error) {
        console.log(error)
    }
})

//createUser({username, email, password, first_name, last_name, profile_picture})

// const { usersRouter } = require('./users')
// apiRouter.use('/users', usersRouter)

// const { tweetsRouter } = require('./tweets')
// apiRouter.use('/tweets', tweetsRouter)



apiRouter.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send(err)
})

module.exports = {
    apiRouter
}