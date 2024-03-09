const express = require("express");
const app = express();
const dbConnection = require("./dbconfig");
const port = 5555;

// initializing cors
const cors = require("cors");
app.use(cors());

app.use(express.json());

const users = require("./user");
app.use("/api/users", users);

// listening to db
async function start() {
    try {
        await app.listen(port);
        console.log("Connected to database");
        console.log(`Listening to ${port}`);
    } catch (error) {
        console.log(error.message);
    }
}
start();
