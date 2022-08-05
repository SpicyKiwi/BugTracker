const client = require('./client.js')

async function createTicket({title, short_description, full_description, status, project_title, creator}) {
    try {
        // Does not include an assigned user automatically when creating a ticket
        // If the creator of the ticket wants to assign a user at the time of creating the ticket, then this will
        // execute first and create a ticket with NULL for the assigned user. Then automatically after the ticket is created
        // the selected user will get assigned to the newly created ticket.

        const {rows:[ticket]} = await client.query(`
            INSERT INTO tickets(title, short_description, full_description, status, project_title, creator, assigned_user)
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `, [title, short_description, full_description, status, project_title, creator])

        return ticket

    } catch (error) {
        throw error
    }
}

async function assignUserToTicket({ticketId, assigned_user}) {
    try {

        const {rows: [updatedTicket]} = await client.query(`
            UPDATE tickets
            SET assigned_user=$1
            WHERE tickets.id=$2
            RETURNING *;
        `, [assigned_user, ticketId])

        return updatedTicket

    } catch (error) {
        throw error
    }
}

module.exports = {
    createTicket,
    assignUserToTicket
}