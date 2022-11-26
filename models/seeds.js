// npm run seed
// this files only job is to populate stuff from the database
///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
require('dotenv').config()
const mongoose = require('./connection');
const Animal = require('./animals') //path to fruit model one . we are in the same file path



///////////////////////////////////////////
// Seed Code
////////////////////////////////////////////
// Make sure code is not run till connected
mongoose.connection.on("open", () => { //if open and connect to db run this function

  const startAnimals = [
    { species: "Cat", extinct: false, location: "North America", lifeExpectancy:20},
    { species: "Dog", extinct: false, location: "North America", lifeExpectancy:15},
    { species: "Chicken", extinct: false, location: "North America", lifeExpectancy:10},
    { species: "Wolf", extinct: false, location: "North America" , lifeExpectancy:20 },
    { species: "Giraffe", extinct: false, location: "North America" , lifeExpectancy:15},
  ]
  // Delete all fruits/old data first so its clean
  Animal.deleteMany({}, (err, data) => { //{}=everything.Could be detailed eg{name:routerle}
    // Seed Starter Fruits
    Animal.create(startAnimals,(err, data) => {
        // send created fruits as response to confirm creation
        console.log(data);//should get fruits as json in browser
      });
  });
  });

//npm run seed  (to pre populate data if i started with no data)
  //node models/seeds.js (to populate the seed data in browser)
  //npm run dev (to see the fresh set of data)
  //ctrl c inbetween each step.