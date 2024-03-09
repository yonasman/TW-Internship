const express = require("express");
const router = express.Router();
const dbConnection = require("./dbconfig");

router.post("/user", async (req, res) => {
    const {full_name,email,subject,message} = req.body
    try {
        await dbConnection.query("INSERT INTO users(full_name,email,subject,message) VALUES(?,?,?,?)",[full_name,email,subject,message]);
        console.log("Your Message posted successfully");
        res.status(200).send("Your Message posted successfully");
    } catch (error) {
        console.error("Error creating table 'users':", error);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;
