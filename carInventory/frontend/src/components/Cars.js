// Import React, useState and useEffect hooks, CarForm and UpdateCarForm components
import React, { useState, useEffect } from "react";
import AddCarForm from "./AddCarForm";
import UpdateCarForm from "./UpdateCarForm";

function Cars() {
  // Initialise state variables with useState hook
  const [cars, setCars] = useState([]);
  const [showOlderCars, setShowOlderCars] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [editedCar, setEditedCar] = useState(null);
  const [updateCategory, setUpdateCategory] = useState("");
  const [oldValue, setOldValue] = useState("");
  const [newValue, setNewValue] = useState("");

  // Fetch data from API using useEffect hook
  useEffect(() => {
    fetch("http://localhost:3000/api/cars")
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((err) => console.log(err));
  }, []);

  // Create handle functions:
  // Function to handle deleting a car from the database
  const handleDelete = (id) => {
    // DELETE request to delete the car's information in the database
    fetch(`http://localhost:3000/api/cars/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setCars((prevCars) => prevCars.filter((car) => car._id !== id));
      })
      .catch((err) => console.log(err));
  };

  // Function handleAddCar is called when a new car is added through the form
  const handleAddCar = (car) => {
    // Set state of the cars array to include the new car at the beginning of the array
    setCars((prevCars) => [car, ...prevCars]);
  };

  // Function handleUpdate is called when an existing car is updated through the form
  const handleUpdate = (updatedCar) => {
    // PUT request to update the car's information in the database
    fetch(`http://localhost:3000/api/cars/${updatedCar._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCar),
    })
      .then((res) => res.json())
      .then((data) => {
        // Update state of cars array to replace the original car with the updated car
        setCars((prevCars) =>
          prevCars.map((car) => (car._id === updatedCar._id ? updatedCar : car))
        );
        // Reset the selectedCar state to 'null' to hide the UpdateCarForm component
        setSelectedCar(null);
      })
      .catch((err) => console.log(err));
  };

  // Function to handle updating multiple cars with a new value for a specified category
  const handleUpdateMultipleCars = (event) => {
    // When 'Update Multiple' button is clicked, set updateForm to true to show form
    setUpdateForm(true);
    // Prevent default form submission behavior
    event.preventDefault();

    // Clear input fields and selected car when 'Update Multiple Cars' is clicked
    setUpdateCategory("");
    setOldValue("");
    setNewValue("");
    setSelectedCar(null);
  };

  const handleUpdateFormSubmit = (event) => {
    // Prevent default form submission behavior
    event.preventDefault();

    // Check if all input fields have values
    if (updateCategory && oldValue && newValue) {
      // Split the old values string into an array of values
      const oldValuesArr = oldValue.split(",").map((val) => val.trim());

      // PUT request to update multiple cars that have the old values in the selected category
      fetch("http://localhost:3000/api/cars/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: updateCategory,
          oldValues: oldValuesArr,
          newValue,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // Console.log the response message
          console.log(data.message);

          // Update state of cars to show new values
          setCars((prevCars) =>
            prevCars.map((car) =>
              oldValuesArr.includes(car[updateCategory])
                ? { ...car, [updateCategory]: newValue }
                : car
            )
          );

          // Clear input fields after update
          setUpdateCategory("");
          setOldValue("");
          setNewValue("");
        })
        .catch((err) => console.log(err));
    }
  };

  // Function sets the edited car state to the input car object, so that it can be edited
  const handleEditCar = (car) => {
    setEditedCar(car);
  };

  // Function handles the saving of the edited car by calling handleUpdate function and setting the edited car state to null
  const handleSaveCar = (car) => {
    handleUpdate(car);
    setEditedCar(null);
  };

  // Filter the cars list to show only the cars that are older than or equal to 2018 (5 years old) if showOlderCars is true.
  const filteredCars = showOlderCars
    ? cars.filter((car) => car.year <= 2018)
    : // Otherwise, show all cars.
      cars;

  return (
    <div>
      <h1>Skinner's Car Inventory</h1>
      <p>
        <strong>Welcome to our car inventory!</strong> Here you will find all
        the information needed about the cars in our database.
        <i>Something not right?</i> Quickly update any information or delete an
        individual car document.
        <i> Want to update multiple cars?</i> Use the Update Multiple button and
        complete the form. Remember to separate any old values you wish to
        change with a comma (,). You can also
        <strong> add a car document</strong> to our database using the quick and
        easy form!
      </p>

      <table>
        <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Registration Number</th>
            <th>Owner</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {filteredCars.map((car) => (
            <tr key={car._id}>
              <td>
                {editedCar && editedCar._id === car._id ? (
                  <input
                    type="text"
                    defaultValue={car.make}
                    onChange={(e) =>
                      setEditedCar({ ...editedCar, make: e.target.value })
                    }
                  />
                ) : (
                  car.make
                )}
              </td>
              <td>
                {editedCar && editedCar._id === car._id ? (
                  <input
                    type="text"
                    defaultValue={car.model}
                    onChange={(e) =>
                      setEditedCar({ ...editedCar, model: e.target.value })
                    }
                  />
                ) : (
                  car.model
                )}
              </td>
              <td>
                {editedCar && editedCar._id === car._id ? (
                  <input
                    type="number"
                    defaultValue={car.year}
                    onChange={(e) =>
                      setEditedCar({
                        ...editedCar,
                        year: parseInt(e.target.value),
                      })
                    }
                  />
                ) : (
                  car.year
                )}
              </td>

              <td>
                {editedCar && editedCar._id === car._id ? (
                  <input
                    type="text"
                    defaultValue={car.registrationNumber}
                    onChange={(e) =>
                      setEditedCar({
                        ...editedCar,
                        registrationNumber: e.target.value,
                      })
                    }
                  />
                ) : (
                  car.registrationNumber
                )}
              </td>
              <td>
                {editedCar && editedCar._id === car._id ? (
                  <input
                    type="text"
                    defaultValue={car.owner}
                    onChange={(e) =>
                      setEditedCar({ ...editedCar, owner: e.target.value })
                    }
                  />
                ) : (
                  car.owner
                )}
              </td>
              <td>
                <button onClick={() => handleDelete(car._id)}>Delete</button>
              </td>
              <td>
                {editedCar && editedCar._id === car._id ? (
                  <button onClick={() => handleSaveCar(editedCar)}>Save</button>
                ) : (
                  <button onClick={() => handleEditCar(car)}>Update</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="btn-grp"
        onClick={() => setShowOlderCars(!showOlderCars)}
      >
        {showOlderCars ? "Show all cars" : "Show cars older than 5 years"}
      </button>
      <button className="btn-grp" onClick={handleUpdateMultipleCars}>
        Update Multiple Cars
      </button>
      {selectedCar ? (
        <UpdateCarForm
          car={selectedCar}
          handleUpdate={handleUpdate}
          setSelectedCar={setSelectedCar}
        />
      ) : (
        <AddCarForm handleAddCar={handleAddCar} />
      )}
      <div>
        {updateForm && (
          <div>
            <h2>Update Multiple Cars</h2>
            <form onSubmit={handleUpdateFormSubmit}>
              <label className="form-label">
                Category:
                <input
                  className="form-input"
                  type="text"
                  value={updateCategory}
                  onChange={(event) => setUpdateCategory(event.target.value)}
                />
              </label>
              <label className="form-label">
                Old Value(s):
                <input
                  className="form-input"
                  type="text"
                  value={oldValue}
                  onChange={(event) => setOldValue(event.target.value)}
                />
              </label>
              <label className="form-label">
                New Value:
                <input
                  className="form-input"
                  type="text"
                  value={newValue}
                  onChange={(event) => setNewValue(event.target.value)}
                />
              </label>
              <button className="form-btn-grp" type="submit">
                Update
              </button>
              <button
                className="form-btn-grp"
                onClick={() => setUpdateForm(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cars;

/* Note to reviewer:
I have noticed that sometimes an error message pops up instead of 
loading the page but then disappears after a few seconds. I don't have any errors in
the console or that I can see when I am running this application, so I am not sure
if that is just something unique to my machine as this was happening with my previous
React and Express apps and had a mentor call trying to help with it, but they were 
uncertain as to why that was happening for a few seconds and disappearing. 
I also should note that before, my database was loading right away but now if I refresh the page,
the table of data doesn't appear for a few seconds. I have tried to troubleshoot but nothing 
seems to be able to solve the issue as it doesn't happen every time. */
