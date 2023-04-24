import React, { useState } from "react";

function AddCarForm({ handleAddCar }) {
  // Define state variables for each input field
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(0);
  const [owner, setOwner] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Define function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a car object using the form input values
    const car = { make, model, year, owner, registrationNumber };

    // POST request to the server to add the new car
    fetch("http://localhost:3000/api/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Call the handleAddCar function passed as a prop to update the list of cars with the new car
        handleAddCar(data);
      })
      .catch((err) => console.log(err));

    // Clear the form input fields
    setMake("");
    setModel("");
    setYear(0);
    setOwner("");
    setRegistrationNumber("");
  };

  // Render the form and input fields
  return (
    <div>
      {/* show/hide the form when clicking the 'Add a new car' button */}
      <button className="add-new-btn" onClick={() => setShowForm(!showForm)}>
        Add a new car
      </button>

      {/* only show the form when showForm state is true */}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="make">Make:</label>
            <input
              type="text"
              id="make"
              value={make}
              onChange={(event) => setMake(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="model">Model:</label>
            <input
              type="text"
              id="model"
              value={model}
              onChange={(event) => setModel(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="year">Year:</label>
            <input
              type="number"
              id="year"
              value={year}
              onChange={(event) => setYear(parseInt(event.target.value))}
            />
          </div>
          <div>
            <label htmlFor="registrationNumber">Registration Number:</label>
            <input
              type="text"
              id="registrationNumber"
              value={registrationNumber}
              onChange={(event) => setRegistrationNumber(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="owner">Owner:</label>
            <input
              type="text"
              id="owner"
              value={owner}
              onChange={(event) => setOwner(event.target.value)}
            />
          </div>

          <button type="submit">Add car</button>
        </form>
      )}
    </div>
  );
}

export default AddCarForm;
