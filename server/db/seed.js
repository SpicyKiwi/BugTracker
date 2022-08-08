const client = require('./client.js')

const {
    createUser,
    createProject,
    getAllProjectUsers,
    addUserToProject,
    createTicket,
    assignUserToTicket
} = require('./')

async function dropTables() {
    try {
        console.log('Dropping all tables.. .')

        await client.query(`

        DROP TABLE IF EXISTS old_tickets;
        DROP TABLE IF EXISTS old_projects;
        DROP TABLE IF EXISTS project_users;
        DROP TABLE IF EXISTS tickets;
        DROP TABLE IF EXISTS projects;
        DROP TABLE IF EXISTS users;

        `)

        console.log('Finished dropping tables!')
    } catch (error) {
        console.error('Error while dropping tables!')
        console.error('The error: ', error)
        throw error
    }
}

async function createTables() {
    try {
        console.log('Starting to build tables...')

        await client.query(`
        
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(100) UNIQUE NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            profile_picture VARCHAR(50) NOT NULL
        );
        
        CREATE TABLE projects(
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) UNIQUE NOT NULL,
            owner VARCHAR(255) REFERENCES users(username) ON UPDATE CASCADE,
            status VARCHAR(255) NOT NULL
        );

        CREATE TABLE project_users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) REFERENCES users(username),
            project_name VARCHAR(255) REFERENCES projects(title) ON UPDATE CASCADE,
            access_level VARCHAR(255) NOT NULL
        );


        CREATE TABLE tickets(
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            short_description VARCHAR(255),
            full_description VARCHAR(255) NOT NULL,
            status VARCHAR(255) NOT NULL,
            project_title VARCHAR(255) REFERENCES projects(title),
            creator VARCHAR(255) REFERENCES users(username) NOT NULL,
            assigned_user VARCHAR(255)
        );

        CREATE TABLE old_projects(
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            owner VARCHAR(255) NOT NULL,
            status VARCHAR(255) NOT NULL
        );

        CREATE TABLE old_tickets(
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            short_description VARCHAR(255),
            full_description VARCHAR(255) NOT NULL,
            status VARCHAR(255) NOT NULL,
            project_title VARCHAR(255),
            creator VARCHAR(255) REFERENCES users(username) NOT NULL,
            completed_by VARCHAR(255)
        );

        `)

        console.log("Finished building tables!")
    } catch (error) {
        console.error('Error creating tables!')
        console.error('The error: ', error)
        throw error
    }
} 

async function createInitialUsers() {
    console.log("starting to create users...")
    try {

        const usersToCreate = [
            {username: "TestAccount1", email: "test@email.com", password: "password123", first_name: "Test", last_name: "tEST", profile_picture: "DefaultPFP"},
            {username: "fanjum1", email: "anjum_farhan@email.com", password: "farhansPassword", first_name: "Farhan", last_name: "Anjum", profile_picture: "DefaultPFP"},
            {username: "The_One", email: "matrix@email.com", password: "oracle", first_name: "Thomas", last_name: "Anderson", profile_picture: "DefaultPFP"}
        ]

        const users = await Promise.all(usersToCreate.map(createUser))


        console.log("Users Created: ")
        console.log(users)
        console.log("Finished creating the users!")
    } catch (error) {
        console.error("Error while creating users!")
        console.error("The error: ", error)
        throw error
    }
}

async function createInitialProjects() {
    console.log("Starting to create projects...")
    try {

        const projectsToCreate = [
            {title: "Test Project", owner: "TestAccount1", status: "New!"},
            {title: "farhan's project", owner: "fanjum1", status: "New!"},
        ]

        const projects = await Promise.all(projectsToCreate.map(createProject))

        console.log("Projects Created: ")
        console.log(projects)
        console.log("Finished creating the projects!")

    } catch (error) {
        console.error("Error while creating projects!")
        console.error("The error: ", error)
        throw error
    }
}

async function assignInitialUsersToProjects() {
    console.log("Starting to assign users to projects...")
    try {

        const usersToAssign = [
            {username: "The_One", project_name: "Test Project", access_level: "3"},
            {username: "TestAccount1", project_name: "farhan's project", access_level: "1"},
            {username: "The_One", project_name: "farhan's project", access_level: "3"}
        ]

        const assignedUsers = await Promise.all(usersToAssign.map(addUserToProject))

        console.log("User's assigned: ")
        console.log(assignedUsers)
        console.log("Finished assigning users to projects!")


        console.log("Here are the users assigned to projects!")
        const proUser = await getAllProjectUsers()
        console.log(proUser)

    } catch (error) {
        console.error("Error while assigning initial users to projects")
        console.error("The error: ", error)
        throw error
    }
}

async function createInitialTickets() {
    console.log("Starting to create tickets...")
    try {

        const ticketsToCreate = [
            {title: "Submit Button", short_description: "won't let me submit!", full_description: "Fix submit button on the information page", status: "1", project_title: "farhan's project", creator: "fanjum1" },
            {title: "TicketTitle", short_description: "short description", full_description: "this is the full description. All the details can go here", status: "1", project_title: "Test Project", creator: "TestAccount1" },
            {title: "Wake them up", short_description: "red pill distribution", full_description: "Neo, we need your help! Give red pills to everyone and unplug them from the system!", status: "2", project_title: "farhan's project", creator: "fanjum1" },
            {title: "Add background color", short_description: "", full_description: "Add a back ground color to the page. Any color will be fine", status: "3", project_title: "Test Project", creator: "TestAccount1" }
        ]

        const tickets = await Promise.all(ticketsToCreate.map(createTicket))

        console.log("Created Tickets: ")
        console.log(tickets)


        const usersToAssignToTicket = [
            {ticketId: 1, assigned_user: ""},
            {ticketId: 2, assigned_user: ""},
            {ticketId: 3, assigned_user: "The_One"},
            {ticketId: 4, assigned_user: "The_One"}
        ]

        const usersAssignedToTickets = await Promise.all(usersToAssignToTicket.map(assignUserToTicket))
        console.log("Assigned users to tickets: ")
        console.log(usersAssignedToTickets)

    } catch (error) {
        console.error("Error while creating tickets")
        console.error("The error: ", error)
        throw error
    }
}

async function rebuildDB() {
    try {
        console.log("Starting to rebuild the DB...")

        await client.connect()
        await dropTables()
        await createTables()
        await createInitialUsers()
        await createInitialProjects()
        await assignInitialUsersToProjects()
        await createInitialTickets()


        console.log("RebuildDB function was successful!")
    } catch (error) {
        console.error("Error during the DB rebuild!")
        console.error("The error: ", error)
        throw error
    }
}

rebuildDB()
    .catch(console.error)
    .finally(() => {
        console.log("It's done!")
        client.end()
    })