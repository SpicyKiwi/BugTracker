const client = require('./client.js')

async function createProject({title, owner, status}) {
    try {

        const { rows: [project] } = await client.query(`
            INSERT INTO projects(title, owner, status)
            VALUES($1, $2, $3)
            ON CONFLICT(title) DO NOTHING
            RETURNING *;
        `, [title, owner, status])

        //console.log("The Projectssss: ", project)

        await connectOwnerToProject({username: owner, project_name: title})

        return project

    } catch (error) {
        throw error
    }
}

async function connectOwnerToProject({username, project_name}) {
    // helper function
    try {

        const {rows: [projectOwner]} = await client.query(`
            INSERT INTO project_users(username, project_name, access_level)
            VALUES($1, $2, $3)
            RETURNING *;
        `, [username, project_name, "4"])

        //console.log("Uhhhhh something idrk what this is: ", projectOwner)

        return projectOwner

    } catch (error) {
        throw error
    }
}

async function getAllProjectUsers() {
    try {

        const {rows: [projectUser]} = await client.query(`
            SELECT * FROM project_users;
        `)

        console.log(projectUser)

        return projectUser

    } catch (error) {
        throw error
    }
}

module.exports = {
    createProject
}