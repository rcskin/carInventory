const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const carsRoutes = require('./backend/routes/carRoutes');
// Set the port
const port = process.env.PORT || 3000;

// Create an Express app
const app = express();


// connect to MongoDB database
mongoose.connect('mongodb+srv://skinnerrachelc:carInventory@cluster0.uq2aqbi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.log('Error connecting to MongoDB:', error.message);
});

// Use middleware to parse JSON data
app.use(express.json());
app.use(cors());

// Set up routes
app.use('/api/cars', carsRoutes);


// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

//Sources:
//Used task notes and sources mentioned on Car.js and car.controller.js files
