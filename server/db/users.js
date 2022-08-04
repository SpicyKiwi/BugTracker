const client = require('./client.js')
//const bcrypt = require('bcrypt')

async function createUser({username, email, password, first_name, last_name, profile_picture}) {

    if(!username || !email || !password || !first_name || !last_name || !profile_picture) {
        return
    }

    try {

        //const hashedPassword = await bcrypt.hash(password, 10)

        const { rows: [user] } = await client.query(`
            INSERT INTO users(username, email, password, first_name, last_name, profile_picture)
            VALUES($1, $2, $3, $4, $5, $6)
            ON CONFLICT (email) DO NOTHING
            RETURNING *;
        `, [username, email, password, first_name, last_name, profile_picture])

        return user
        
    } catch (error) {
        throw error
    }
}

async function getUsers() {
    try {
        
        const { rows: [users] } = await client.query(`
            select * from users;
        `)

        return users

    } catch (error) {
        throw error
    }
}

module.exports = {
    createUser,
    getUsers
}