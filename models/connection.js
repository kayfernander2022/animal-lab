//////////////////////////
//DATABASE CONNECTIONS
/////////////////////////


//Database Dependencies
require("dotenv").config() // Load ENV Variables
const mongoose = require("mongoose")// gives us the db connection and methods


//Database Connections
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }


// Establish Database Connections
mongoose.connect(DATABASE_URL, CONFIG)

// Events for when connection opens/disconnects/errors
mongoose.connection
.on("open", () => console.log("Connected to Mongoose"))
.on("close", () => console.log("Disconnected from Mongoose"))
.on("error", (error) => console.log(error))


//Export the Database Connection
//Export this connection of  mongoose so its available in other files
//we will use this in our models file
module.exports = mongoose