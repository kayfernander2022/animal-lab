/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config() // Load ENV Variables
const express = require("express") // import express
const morgan = require("morgan") //import morgan
const methodOverride = require("method-override")
const Animal = require("./models/animals.js")
const mongoose = require("mongoose")
/////////////////////////////////////////////////
// Create our Express Application Object
/////////////////////////////////////////////////
const app = express()


/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////

// Setup inputs for our connect function
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

// Establish Connection
mongoose.connect(DATABASE_URL, CONFIG)

// Events for when connection opens/disconnects/errors
mongoose.connection
.on("open", () => console.log("Connected to Mongoose"))
.on("close", () => console.log("Disconnected from Mongoose"))
.on("error", (error) => console.log(error))


/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")) //logging
app.use(methodOverride("_method")) // override for Put and Delete requests from forms
app.use(express.urlencoded({extended: true})) // parse urlencoded request bodies
app.use(express.static("public")) // serve files from public statically

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.get("/", (req, res) => {
  res.send("Hello?? your server is running")
})

//INDEX **
app.get("/animal", (req, res) => {
  Animal.find({}, (err, animals) => {
    res.render("index.ejs", { Animals:animals });
  });
});

//NEW **
// /fruits/new
app.get("/animal/new", (req, res) => {
  res.render("new.ejs")
})

//DELETE ROUTE
app.delete("/animal/:id", (req, res) => {
  // get the id from params
  const id = req.params.id
  // delete the animal
  Animal.findByIdAndDelete(id, (err, animal) => {
      
      res.redirect("/animal")
  })
})

//UPDATE ROUTE
app.put("/animal/:id", (req, res) => {
  // get the id from params
  const id = req.params.id
  req.body.extinct = req.body.extinct === "on" ? true : false
  // update the animal
  Animal.findByIdAndUpdate(id, req.body, {new: true}, (err, animal) => {
      // redirect user back to main page with animal 
      res.redirect("/animal")
      
  })
})

//CREATE**
app.post("/animal", (req, res) => {
  // check if the readyToEat property should be true or false
  console.log("extinct: " + req.body.extinct);
  req.body.extinct = req.body.extinct === "on" ? true : false;
  console.log("new extict: " + req.body.extinct);
  
  Animal.create(req.body, (err, animals) => {
    
    res.redirect("/animal");
  });
});

//EDIT 
app.get("/animal/:id/edit", (req, res) => {
  
  // get the id from params
  const id = req.params.id
  // get the animal from the database
  Animal.findById(id, (err, animal) => {
    console.log(err);
      
      res.render("edit.ejs", {Animal:animal})
  })
})



// SHOW
app.get("/animal/:id", (req, res) => {
  // get the id from params
  const id = req.params.id
  
  Animal.findById(id, (err, animal) => {
      // render the template with the data from the database
      res.render("show.ejs", {Animals:animal})
      //res.json(animal)
  })
})


//Listener
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))