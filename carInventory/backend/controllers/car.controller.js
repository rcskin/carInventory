const Car = require("../models/Car");

// Get car function takes HTTP request and response
exports.getCars = (req, res) => {
  Car.find()
    .then((cars) => {
      res.json(cars);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "An error occurred while retrieving car inventory" });
    });
};

// POST request to create a new car
exports.createCar = (req, res) => {
    // Create a new car object using the data from the request body
  const newCar = new Car({
    model: req.body.model,
    make: req.body.make,
    year: req.body.year,
    registrationNumber: req.body.registrationNumber,
    owner: req.body.owner,
  });
  // Save new car to the database
  newCar
    .save()
    .then((addCar) => {
        // Use 201 status to indicate that a new resource has been successfully created
      res.status(201).json(addCar);
    })
    .catch((err) => {
        // If an error occurred while saving the car, return a 400 status code with an error message in the response
      res
        .status(400)
        .send({ message: "An error occurred while creating a car." });
    });
};

// PUT request that updates the car with the given ID
exports.updateCar = (req, res) => {
    // Get the ID of the car from the request parameters
    const carId = req.params.id;
    // Find and update the car with the given ID
    Car.findByIdAndUpdate(carId, req.body, { new: true })
        .then((updatedCar) => {
            if (!updatedCar) {
            // if the car wasn't found with the given ID, return a 404 error
            return res.status(404).json({ message: "Car not found." });
            }
            // return the updated car
            res.json(updatedCar);
        })
        .catch((err) => {
        // if there was an error while updating the car, return a 400 error
        res.status(400).json({ message: "There was an error updating the car." });
        });
};

//PUT request for updating many cars
exports.updateManyCars = (req, res) => {
  // Destructure the properties of the request body
  const { category, oldValue, newValue } = req.body;

  // Construct a filter object with the category and old value to be updated
  const filter = { [category]: { $in: oldValue } };
  // Construct an update project with the category and the new value
  const update = { [category]: newValue };
  // Update the cars matching the filter with new update
  Car.updateMany(filter, update)
    .then((result) => {
      res.json({ message: "Cars have been updated!" });
    })
    .catch((error) => {
      res
        .status(400)
        .json({ message: "There was an error updating the cars." });
    });
};

// DELETE request for ermoving a car from inventory
exports.deleteCarById = (req, res) => {
  // Find and delete car document with a specified Id
  Car.deleteOne({ _id: req.params.id })
    .then((deletedCar) => {
      if (deletedCar.deletedCount === 1) {
        res.json({ message: "Car document deleted successfully." });
      } else {
        res.status(404).json({ message: "Car document not found." });
      }
    })
    .catch((error) => {
      res
        .status(400)
        .json({ message: "There was an error deleting car document." });
    });
};

/* Sources:
Task Notes
https://kinsta.com/blog/http-status-codes/
https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
https://www.webfx.com/web-development/glossary/http-status-codes/
https://expressjs.com/
https://restfulapi.net/
*/
