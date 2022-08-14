const express = require('express')
const projectsRouter = express.Router()

const genericError = { error: "Something went wrong! Try again"}

projectsRouter.use(express.json())

const {
    getAllProjects,
    createProject
} = require('../db')

projectsRouter.use((req, res, next) => {
    console.log("A request is being made to /users")
    next()
})

projectsRouter.get("/", async (req, res, next) => {
    //get all projects
    try {
        const projects = await getAllProjects()

        res.send(projects)
    } catch (error) {
        res.status(500).send(genericError)
    }
})

projectsRouter.post("/", async (req, res, next) => {
    //create a project
    const {title, owner, status} = req.body
    try {
        const project = await createProject({title, owner, status})
        res.send(project)

    } catch (error) {
        res.status(500).send(genericError)
    }
})



module.exports = {
    projectsRouter
}