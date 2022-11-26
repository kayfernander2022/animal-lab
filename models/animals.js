


//Import Dependencies
const mongoose = require('./connection') 

const {Schema, model} = mongoose//Destructuring. Grabbing Model and Schema off the mongoose variable eg:
//mongoose.Schema
//mongoose.model

// Make Animal Schema
const animalSchema = new Schema({
    species: String,
    extinct: Boolean,
    location: String,
    lifeExpectancy: Number
})//could add timestamp here..



const Animal = model("Animal", animalSchema)
//*************************************** */
// Export the data so we can use it in another file 
//*************************************** */
module.exports = Animal