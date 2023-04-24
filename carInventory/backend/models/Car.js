const mongoose = require("mongoose");

//create a schema for the cars using mongoose
const carsSchema = new mongoose.Schema({
  model: { type: String, required: true },
  make: { type: String, required: true },
  year: { type: Number, required: true },
  registrationNumber: { type: String, required: true },
  owner: { type: String, required: true },
});

module.exports = mongoose.model("Cars", carsSchema);

//Sources:
//Task Notes and https://mongoosejs.com/docs/guide.html
