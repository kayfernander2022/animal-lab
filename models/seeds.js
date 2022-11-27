// npm run seed
// this files only job is to populate stuff from the database
///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
require('dotenv').config()
const mongoose = require('./connection');
const Animal = require('./animals') //path to animal model



///////////////////////////////////////////
// Seed Code
////////////////////////////////////////////

mongoose.connection.on("open", () => { //if open and connect to db run this function

  const startAnimals = [
    { species: "Cat", extinct: false, location: "North America", lifeExpectancy:20},
    { species: "Dog", extinct: false, location: "North America", lifeExpectancy:15},
    { species: "Chicken", extinct: false, location: "North America", lifeExpectancy:10},
    { species: "Wolf", extinct: false, location: "North America" , lifeExpectancy:20 },
    { species: "Giraffe", extinct: false, location: "North America" , lifeExpectancy:15},
  ]
  // Delete all old animals first so its clean
  Animal.deleteMany({}, (err, data) => { //{}=everything.Could be detailed eg{name:routerle}
    // Seed Starter Animals
    Animal.create(startAnimals,(err, data) => {
        // send created animals as response to confirm creation
        console.log(data);//should see animals as json
      });
  });
  });

