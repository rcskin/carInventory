const express = require("express");
const router = express.Router();

const carController = require("../controllers/car.controller");

// GET all cars
router.get("/", carController.getCars);

// POST create a new car
router.post("/", carController.createCar);

// PUT update a car by ID
router.put("/:id", carController.updateCar);

// PUT update many cars
router.put("/", carController.updateManyCars);

// DELETE delete a car by ID
router.delete("/:id", carController.deleteCarById);

module.exports = router;
