const { Client } = require('pg')

// let local = {
//   host: "127.0.0.1",
//   user: "farhan",
//   port: 5432,
//   password: "farhan",
//   database: "bugtracker"
// }


// const client = new Client(local)

const client = new Client({
  connectionString: 'postgresql://farhan:farhan@127.0.0.1:5432/bugtracker'
})

module.exports = client