const mysql2 = require("mysql2")
const dotenv = require("dotenv")
dotenv.config()

// connecting to the database
const dbConnection = mysql2.createPool({
    user:`${process.env.USER}`,
    database:`${process.env.DATABASE}`,
    host:"localhost",
    password:`${process.env.PASSWORD}`,
    connectionLimit:10
})
// dbConnection.execute("SELECT 'test'",(error,result) => {
//     if(error) {
//         console.log(error.message)
//     } else {
//         console.log(result)
//     }
// })
module.exports = dbConnection.promise()