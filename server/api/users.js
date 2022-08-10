const express = require('express')
const usersRouter = express.Router()

const genericError = { error: "Something went wrong! Try again"}

usersRouter.use(express.json())

const {
    getAllUsers
} = require('../db')

usersRouter.use((req, res, next) => {
    console.log("A request is being made to /users")
    next()
})

usersRouter.get("/", async (req, res, next) => {
    //get all users
    try {
        const users = await getAllUsers()
        res.send(users)
    } catch (error) {
        res.status(500).send(genericError)
    }
})

module.exports = {
    usersRouter
}