const express = require('express')
const projectsRouter = express.Router()

const genericError = { error: "Something went wrong! Try again"}

projectsRouter.use(express.json())

const {
    getAllProjects
} = require('../db')

projectsRouter.use((req, res, next) => {
    console.log("A request is being made to /users")
    next()
})

projectsRouter.get("/", async (req, res, next) => {
    //get all projects
    try {
        const users = await getAllProjects()

        res.send(users)
    } catch (error) {
        res.status(500).send(genericError)
    }
})



module.exports = {
    projectsRouter
}