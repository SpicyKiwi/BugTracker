const express = require('express')
const usersRouter = express.Router()

const genericError = { error: "Something went wrong! Try again"}

usersRouter.use(express.json())

const {
    getAllUsers,
    getUserByUsername,
    createUser
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

usersRouter.post("/register", async (req, res, next) => {
    //create a user
    const {username, email, password, first_name, last_name, profile_picture} = req.body
    try{

        const user = await createUser({username, email, password, first_name, last_name, profile_picture})

        res.send(user)

    } catch (error) {
        res.status(500).send(genericError)
    }
})

usersRouter.get("/:username", async (req, res, next) => {
    const {username} = req.params
    try {
        const user = await getUserByUsername(username)

        res.send(user)
    } catch (error) {
        res.status(500).send(genericError)
    }
})

module.exports = {
    usersRouter
}